import { signOutAsync } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SessionUserDTO } from "next-auth";
import { LogOut } from "lucide-react";


const UserButton = (
{ 
    sessionUser
}:
    { 
        sessionUser: SessionUserDTO
    }
) => {

    const name = sessionUser?.name
    const nameModifier = name?.charAt(0)?.toUpperCase() ?? "U";
    const surname = sessionUser?.surname
    const surnameModifier = surname?.charAt(0)?.toUpperCase() ?? "N";
    const fullNameModifier = `${nameModifier}${surnameModifier}`;
    const email = sessionUser?.email

  return <div className="flex gap-2 items-center">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center">
                    <Button variant='ghost'
                            className="relative p-5 w-8 h-8 roundend-full ml-2 flex-items-center justify-center bg-gray-200"
                    >
                        { fullNameModifier }
                    </Button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-3" align='center' forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <div className="text-sm font-medium leading-none">
                            {name} {surname}
                        </div>
                        <div className="text-sm text-muted-foreground leading-none">
                            {email}
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuItem className="p-0 mb-1">
                    <form action={ signOutAsync } className="w-full">
                        <Button className="w-full py-4 px-2 h-4 justify-start" variant="ghost">
                            <LogOut /> Sign Out
                        </Button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
};

export default UserButton;
