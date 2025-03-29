import upsertCartSchema from "@/lib/validators/cart/upsertCartSchema";
import { z } from "zod";

type UpsertCartRequest = z.infer<typeof upsertCartSchema> 

export default UpsertCartRequest