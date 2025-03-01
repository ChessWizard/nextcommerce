import { Currency } from "@/constants/enums/currency";

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