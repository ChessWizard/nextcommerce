'use server'

import UpsertCartRequest from "@/types/cart/upsertCartRequest";
import { Result } from "../results/result";
import database from "@/prisma/adapter";
import ProductMessages from "../results/messages/productMessages";
import { CartConstants } from "../constants/cartConstants";
import { CartItem, CartItemStatus } from "@prisma/client";
import CartMessages from "../results/messages/cartMessages";
import CartDTO from "@/types/cart/cartDTO";
import cartSchema from "../validators/cart/cartSchema";
import { auth } from "@/auth/auth";

const session = await auth()

export async function upsertCartAsync(
    data: UpsertCartRequest
){
    const product = await database.product
                            .findFirst({
                                where: {
                                    id: data.productId
                                }
                            })
    
    if(!product)
        return Result.Error(ProductMessages.Error.NotFound).toJSON()

    if(product.stock <= 0)
        return Result.Error(ProductMessages.Error.OutOfStock).toJSON()

    const userCart = await database.cart
                             .findFirst({
                                where: {
                                    userId: data.userId
                                },
                                include: {
                                    cartItems: {
                                        select: {
                                            id: true,
                                            productId: true,
                                            cartItemStatus: true
                                        }
                                    }
                                }
                             })

    if(!userCart){
        await database.cart.create({
            data: {
                userId: data.userId,
                cartItems: {
                    create: [
                        {
                            quantity: CartConstants.CART_ITEM_DEFAULT_INCREMENT,
                            cartItemStatus: CartItemStatus.ADDED,
                            isSelected: true,
                            productId: data.productId
                        }
                    ]
                } 
            }
        })
        return Result.Success(CartMessages.Success.AddedToCart).toJSON()
    }
    else {
        const isExistCartItem = userCart.cartItems
                                        .find(cartItem => cartItem.productId == product.id)

        if(!isExistCartItem){
            
            await database.cart
                    .update({
                        where: {
                            id: userCart.id
                        },
                        data: {
                            cartItems: {
                                create: [
                                    {
                                        quantity: CartConstants.CART_ITEM_DEFAULT_INCREMENT,
                                        cartItemStatus: CartItemStatus.ADDED,
                                        isSelected: true,
                                        productId: data.productId
                                    }
                                ]
                            }
                        }
                    })

            return Result.Success(CartMessages.Success.AddedToCart).toJSON()
        }
        else {
            
            if(isExistCartItem.cartItemStatus === CartItemStatus.ADDED_BEFORE){
                return await retakeCartItemToCartAsync(userCart.cartItems as CartItem[], isExistCartItem.id)
            }
            else{

                await database.cartItem
                        .updateMany({
                            where: {
                                cartId: userCart.id,
                                productId: data.productId
                            },
                            data: {
                                quantity: {
                                    increment: CartConstants.CART_ITEM_DEFAULT_INCREMENT
                                }
                            }
                })
                return Result.Success(CartMessages.Success.AddedToCart).toJSON()
            }
        }
    }
}

export async function retakeCartItemToCartAsync(
    cartItems: CartItem[],
    cartItemId: string
){
    const userCartItem = cartItems.find(cartItem => cartItem.id == cartItemId)
    if(!userCartItem)
        return Result.Error(CartMessages.Error.NotFoundProductRetakeToCart).toJSON()

    if(userCartItem.cartItemStatus === CartItemStatus.ADDED)
        return Result.Error(CartMessages.Error.ProductAlreadyAdded).toJSON()

    await database.cartItem
            .update({
                where: {
                    id: cartItemId
                },
                data: {
                    cartItemStatus: CartItemStatus.ADDED,
                    isSelected: true
                }
            })

    return Result.Success(CartMessages.Success.ProductRetaked).toJSON()
}

export async function removeItemFromCartAsync(
    userId: string,
    cartItem: string
){
    const removalCartItem =  await database.cartItem
                                    .findFirst({
                                        where: {
                                            id: cartItem,
                                            cart: {
                                              userId: userId,
                                            },
                                          },
                                        }) as CartItem
    
    if(!removalCartItem)
        return Result.Error(CartMessages.Error.NotFoundRemovalCartItem)

    switch (removalCartItem.cartItemStatus) {
        case CartItemStatus.ADDED:
            handleAddedCartItemProcessAsync(removalCartItem)
            return Result.Success(CartMessages.Success.CartItemChangedToAddedBefore)
        
        case CartItemStatus.ADDED_BEFORE:
            await handleAddedBeforeCartItemProcessAsync(removalCartItem.id)
            return Result.Success(CartMessages.Success.CartItemRemoved)
        default:
            return Result.Error(CartMessages.Error.NotFoundRemovalCartItem)
    }
}

async function handleAddedCartItemProcessAsync(cartItem: CartItem) {
    await database.cartItem.update({
      where: { id: cartItem.id },
      data: {
        cartItemStatus: CartItemStatus.ADDED_BEFORE,
        isSelected: false,
      },
    });
  }

async function handleAddedBeforeCartItemProcessAsync(cartItemId: string){
    await database.cartItem
            .delete({
                where: {
                    id: cartItemId
                }
            })
}

export async function getCartAsync(userId: string)
    : Promise<Result<CartDTO>>{

    const userCart = await database.cart
                             .findFirst({
                                where: {
                                    userId: userId
                                },
                                include: {
                                    cartItems: {
                                        include: {
                                            product: {
                                                include: {
                                                    prices: true
                                                }
                                            }
                                        }
                                    }
                                }
                             })

    if(!userCart || userCart.cartItems.length === 0)
        return Result.Error(CartMessages.Error.CartEmpty)

    userCart.cartItems = userCart.cartItems.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const userCartDtoResult = cartSchema.safeParse(userCart)
    if(!userCartDtoResult.success){
        console.log(userCartDtoResult.error)
        return Result.Error(CartMessages.Error.CartEmpty)
    }
        
    const userCartDto = userCartDtoResult.data
    return Result.Success<CartDTO>(userCartDto, CartMessages.Success.CartFound)
}

export async function updateCartItemAsync(
    cartItemId: string,
    quantity?: number,
    isSelected?: boolean
){

    const userCartItem = await database.cart.findFirst({
        where: {
          userId: session?.user.id,
          cartItems: {
            some: { id: cartItemId },
          },
        },
        include: {
          cartItems: {
            where: { id: cartItemId },
          },
        },
      });
    
      if (!userCartItem || userCartItem.cartItems.length === 0) {
        return Result.Error(CartMessages.Error.NotFoundCartItem).toJSON()
      }
    
      const [cartItem] = userCartItem.cartItems;
    
      const dataToUpdate: {
        quantity?: number;
        isSelected?: boolean;
      } = {};
    
      if (quantity != null) {
        dataToUpdate.quantity = quantity;
      }
      if (isSelected != null) {
        dataToUpdate.isSelected = isSelected;
      }

      await database.cartItem.update({
        where: { id: cartItem.id },
        data: dataToUpdate,
      });
    
      return Result.Success(
        CartMessages.Success.AddedToCart
      ).toJSON()
}