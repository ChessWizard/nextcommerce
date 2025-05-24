"use server";

import database from "@/prisma/adapter";
import { Result } from "../results/result";
import { DistrictDTO, districtSchema } from "@/types/district/districtDTO";
import { z } from "zod";
import DistrictMessages from "../results/messages/districtMessages";

export const getDistrictsByCityIdAsync = async (
  cityId: string
): Promise<Result<DistrictDTO[]>> => {

  const districts = await database.district
                                    .findMany({
                                        where: {
                                          cityId: cityId,
                                        },
                                    });

  if (!districts || districts.length <= 0)
    return JSON.parse(JSON.stringify(Result.Error<DistrictDTO[]>(DistrictMessages.Error.NotFoundPlural)));

  const parsedResult = z.array(districtSchema).safeParse(districts);
  if (!parsedResult.success)
    return JSON.parse(JSON.stringify(Result.Error<DistrictDTO[]>(DistrictMessages.Error.Failed)));

  return JSON.parse(
    JSON.stringify(
      Result.Success<DistrictDTO[]>(
        parsedResult.data,
        DistrictMessages.Success.FoundPlural
      )
    )
  );
};
