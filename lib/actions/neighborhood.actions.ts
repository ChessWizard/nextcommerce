"use server";

import database from "@/prisma/adapter";
import { Result } from "../results/result";
import { z } from "zod";
import { NeighborhoodDTO, neighborhoodSchema } from "@/types/neighborhood/neighborHoodDTO";
import NeighborhoodMessages from "../results/messages/neighborhoodMessages";

export const getNeighborHoodsByDistrictIdAsync = async (
  districtId: string
): Promise<Result<NeighborhoodDTO[]>> => {

  const neighborhoods = await database.neighborhood
                                    .findMany({
                                        where: {
                                          districtId: districtId,
                                        },
                                    });

  if (!neighborhoods || neighborhoods.length <= 0)
    return JSON.parse(JSON.stringify(Result.Error<NeighborhoodDTO[]>(NeighborhoodMessages.Error.NotFoundPlural)));

  const parsedResult = z.array(neighborhoodSchema).safeParse(neighborhoods);
  if (!parsedResult.success)
    return JSON.parse(JSON.stringify(Result.Error<NeighborhoodDTO[]>(NeighborhoodMessages.Error.Failed)));

  return JSON.parse(
    JSON.stringify(
      Result.Success<NeighborhoodDTO[]>(
        parsedResult.data,
        NeighborhoodMessages.Success.FoundPlural
      )
    )
  );
};
