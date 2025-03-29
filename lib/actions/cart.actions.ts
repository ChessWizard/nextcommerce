'use server'

import UpsertCartRequest from "@/types/cart/upsertCartRequest";
import { Result } from "../results/result";
import database from "@/prisma/adapter";
import ProductMessages from "../results/messages/productMessages";
import { CartConstants } from "../constants/cartConstants";
import { CartItem, CartItemStatus } from "@prisma/client";
import CartMessages from "../results/messages/cartMessages";

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