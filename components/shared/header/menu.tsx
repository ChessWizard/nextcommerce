import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { APP_NAME } from "@/lib/constants";
import { MenuIcon } from "lucide-react";
import Image from "next/image";

const Menu = () => {
  return (
    <nav className="md:hidden max-w-xs mr-3">
      <Sheet>
        <SheetTrigger className="flex flex-col items-center">
          <MenuIcon />
          <span className="text-xs">Menu</span>
        </SheetTrigger>
        <SheetContent className="flex flex-col items-start" side="left">
          <SheetTitle className="flex items-center">
            <Image
              src="/images/logo.webp"
              alt={`${APP_NAME} logo`}
              height={40}
              width={40}
              priority={true}
            />
            <div className="font-bold text-base ml-3 text-gray-900">
              {APP_NAME}
            </div>
          </SheetTitle>
          {/* Categories and website navigations will be added */}
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Menu;
