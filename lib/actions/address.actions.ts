"use server"

import database from "@/prisma/adapter"
import { AddressType } from "@prisma/client"
import { Result } from "../results/result"
import { AddressDTO, addressSchema } from "@/types/address/addressDTO"
import AddressMessages from "../results/messages/addressMessages"

export const getUserAddressByTypeAsync = async (userId: string,
    addressType: AddressType
): Promise<Result<AddressDTO>> => {

    const userAddress = await database.address
                                .findFirst({
                                    where: {
                                        userId: userId,
                                        addressType: addressType
                                    },
                                    select: {
                                        id: true,
                                        userId: true,
                                        name: true,
                                        surname: true,
                                        phone: true,
                                        countryId: true,
                                        cityId: true,
                                        districtId: true,
                                        neighborhoodId: true,
                                        title: true,
                                        detail: true,
                                        latitude: true,
                                        longitude: true,
                                        zip: true,
                                        addressType: true,
                                        createdAt: true,
                                        modifiedAt: true
                                    }
                                })

    if(!userAddress)
        return Result.Error<AddressDTO>(AddressMessages.Error.NotFound);

    const parsedResult = addressSchema.safeParse(userAddress)
    if(!parsedResult.success)
        return Result.Error<AddressDTO>(AddressMessages.Error.Failed)

    return Result.Success<AddressDTO>(parsedResult.data, AddressMessages.Success.Found)
}