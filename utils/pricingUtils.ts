import { Currency } from "@prisma/client"

export function getCurrencySymbol(currency: Currency): string {
    switch (currency) {
        case Currency.TRY:
            return '₺'
        case Currency.USD:
            return '$'
        default:
            return '₺'
    }
}