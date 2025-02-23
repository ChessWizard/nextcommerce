import { Heart, ShoppingCart, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import Menu from "./menu";

const Header = () => {
    return ( 
        <header className="bg-seagreenextralight w-full border-b">
            <div className="wrapper flex-between">
                <div className="flex-start">
                    <Menu />
                    <Link href="/"
                          className="flex-start">
                            <Image src="/images/logo.webp" 
                                   alt={`${APP_NAME} logo` }
                                   height={48}
                                   width={48}
                                   priority={true} />
                            <div className="hidden lg:block font-bold text-xl ml-3 text-gray-900">
                                {APP_NAME}
                            </div>
                    </Link>
                </div>
                <div className="space-x-2">
                    <Button asChild variant="ghost">
                        <Link href="/sign-in">
                            <UserIcon className="h-[30px] w-[30px] 
                               md:h-[40px] md:w-[40px]
                               lg:h-[50px] lg:w-[50px]" 
                            /> 
                            <span className="hidden lg:block text-gray-900">Sign In</span> 
                        </Link>
                    </Button>
                    <Button asChild variant="ghost">
                        <Link href="/favorites">
                            <Heart />
                            <span className="hidden lg:block text-gray-900">Favorites</span> 
                        </Link>
                    </Button>
                    <Button asChild variant="ghost">
                        <Link href="/cart">
                            <ShoppingCart />
                            <span className="hidden lg:block text-gray-900">Cart</span> 
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}
 
export default Header;