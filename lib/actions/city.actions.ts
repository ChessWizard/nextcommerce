"use server"

import { CityDTO, citySchema } from "@/types/city/cityDTO";
import { Result } from "../results/result";
import database from "@/prisma/adapter";
import CityMessages from "../results/messages/cityMessages";
import { z } from "zod";

export const getCitiesByCountryIdAsync = async (countryId: string)
    : Promise<Result<CityDTO[]>> => {

    const cities = await database.city
                              .findMany({
                                where: {
                                    countryId: countryId
                                }
                              })

    if(!cities || cities.length <= 0)
        return JSON.parse(JSON.stringify(Result.Error<CityDTO[]>(CityMessages.Error.NotFoundPlural)))

    const parsedResult = z.array(citySchema).safeParse(cities)
    if(!parsedResult.success)
        return JSON.parse(JSON.stringify(Result.Error<CityDTO[]>(CityMessages.Error.Failed)))

    // for array datas -> JSON stringify
    return JSON.parse(JSON.stringify(Result.Success<CityDTO[]>(parsedResult.data, CityMessages.Success.FoundPlural)))
}