import { Currency } from "@/constants/enums/currency";
import { cn } from "@/lib/utils";
import { getCurrencySymbol } from "@/utils/pricingUtils";

const ProductPrice = ({
    value,
    currency,
    className
}: {value: number;
    currency: Currency;
    className?: string;
}) => {

    const displayedPrice = value.toFixed(2)
    const [absolute, odd] = displayedPrice.split('.')

    return ( 
        <p className={cn('text-lg', 'font-bold', className)}>
            <span className="text-sm align-super">{getCurrencySymbol(currency)}</span>
            {absolute}
            <span className="text-xs align-super">,{odd}</span>
        </p>
     );
}
 
export default ProductPrice;