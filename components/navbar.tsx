"use client"

import Link from "next/link";
import Image from "next/image";
import { Menu,User } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
     isLoggedIn:boolean;
     userName?:string;
     userAvatar?:string;
}



const Navbar:React.FC<NavbarProps> = ({ isLoggedIn, userName, userAvatar })  => {

const menuItemsBeforeLogin = [
     {title:"Home",href: "/"},
     {title:"About",href: "/about"},
     {title:"Login",href: "/login"},
];

const menuItemsAfterLogin =[
     {title:"Teachers",href:"/Teachers"},
      {title:"Overview",href:"/Overview"},
       {title:"Performance",href:"/Performance"},
        {title:"Attendance",href:"/Attendance"},
         {title:"Assignments",href:"/Assignments"},
          {title:"Schedule",href:"/Schedule"},
           {title:"Achievements",href:"/Achievements"},
]


  return (
<nav
  className="
    fixed top-0 left-0 w-full z-50
    bg-white/90 dark:bg-black/80
    backdrop-blur-xl
    px-6 py-4
    shadow-[0_4px_20px_rgba(255,255,255,0.3)]
  "
>


<div className="mx-auto max-w-7xl flex flex-center justify-between">

<Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          Tutors Connect
        </Link>

<div className="hidden md:flex items-center gap-6">
{isLoggedIn?(
<NavigationMenu>
     <NavigationMenuLink className="flex gap-4">
{menuItemsAfterLogin.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400" href={item.href}>
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}


     </NavigationMenuLink>
</NavigationMenu>



):(
menuItemsBeforeLogin.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
              >
                {item.title}
              </Link>
            ))
          )}

{isLoggedIn && (
     
<DropdownMenu>
     <DropdownMenuTrigger asChild>
<Button className="rounded-full border p-1">
     {userAvatar? (
 <Image
                      src={userAvatar}
                      alt={userName || "User"}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
     ):(
   <User className="w-6 h-6" />        
     )}

</Button>

</DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end" className="w-40">
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/logout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

{/* //mobile menu */}

<div className="md:hidden">
     <Sheet>
          <SheetTrigger>
               <button>
                    <Menu className="h-6 w-6"/>
               </button>
          </SheetTrigger>
       <SheetContent side="right" className="p-6">
           <div className="flex flex-col gap-4 mt-6">
                {(isLoggedIn ? menuItemsAfterLogin : menuItemsBeforeLogin).map((item) => (
                  <Link key={item.title} href={item.href} className="text-lg font-medium">
                    {item.title}
                  </Link>
                ))}

                {isLoggedIn && (
                  <Button className="w-full mt-4">Logout</Button>
                )}
              </div>
          </SheetContent>     
     </Sheet>

</div>


</div>

    </nav>
  )
}

export default Navbar;





//command for installing the sadcn component
// is the 
// npx shadcn@latest add button
// npx shadcn@latest add sheet
// npx shadcn@latest add navigation-menu
// npx shadcn@latest add dropdown-menu
