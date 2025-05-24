import { DEFAULT_COUNTRY_ID } from "@/constants/parameters";
import { AddressType } from "@prisma/client";

export const createAddressDefaultValues = {
    name: "",
    surname: "",
    phone: "",
    countryId: DEFAULT_COUNTRY_ID,
    cityId: "",
    districtId: "",
    neighborhoodId: "",
    title: "",
    detail: "",
    zip: "",
    addressType: AddressType.SHIPPING
}