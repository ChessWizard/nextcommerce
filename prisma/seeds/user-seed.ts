import { hashSync } from "bcrypt-ts-edge"
import { Role } from "@prisma/client";

const userSeed = {
  users: [
    {
        name: "İsa",
        surname: "Özgür",
        email: "xxxxxx@xxxxx.com",
        password: hashSync("xxxxxxxxxx", 10),
        phone: "000000000000",
        role: Role.ADMIN,
        paymentMethod: "card"
    }
  ]
};

export default userSeed
