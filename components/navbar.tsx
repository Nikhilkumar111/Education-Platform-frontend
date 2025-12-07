"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, User, ChevronDown } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


function ListItem({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block rounded-md p-3 hover:bg-gray-100 transition"
        >
          <div className="font-medium text-gray-900">{title}</div>
          <p className="text-sm text-gray-500">{description}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

interface NavbarProps {
  isLoggedIn: boolean;
  userName?: string;
  userAvatar?: string;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, userAvatar }) => {
  // MENUS -----------------------------------------------------
  const dashboardMenu = [
    { title: "Overview", description: "Quick insights & summary", href: "/overview" },
    { title: "Performance", description: "Progress reports", href: "/performance" },
    { title: "Schedule", description: "Upcoming classes", href: "/schedule" },
    { title: "Assignments", description: "Tasks & submissions", href: "/assignments" },
    { title: "Reports", description: "Downloadable performance", href: "/reports" },
  ];

  const teachersMenu = [
    { title: "Teacher List", description: "Browse all teachers", href: "/teachers" },
    { title: "My Tutors", description: "Your selected tutors", href: "/teachers/my" },
    { title: "Become a Tutor", description: "Apply as instructor", href: "/teachers/join" },
  ];

  const attendanceMenu = [
    { title: "Today’s Attendance", description: "Daily presence record", href: "/attendance/today" },
    { title: "Monthly Attendance", description: "Attendance history", href: "/attendance/month" },
    { title: "Attendance Report", description: "Download attendance data", href: "/attendance/report" },
  ];

  const achievementMenu = [
    { title: "Badges", description: "Unlocked badges", href: "/achievements/badges" },
    { title: "Certificates", description: "Earned certificates", href: "/achievements/certificates" },
    { title: "Rewards", description: "Points & rewards", href: "/achievements/rewards" },
    { title: "Leaderboard", description: "Top performers", href: "/achievements/leaderboard" },
  ];

  const beforeLogin = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Login", href: "/login" },
  ];

  // reusable mega menu generator (shadcn style)
  const renderMenu = (label: string, items: any[]) => (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-sm font-semibold flex items-center gap-1">
        {label}
        <ChevronDown className="w-4 h-4" />
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
          {items.map((item) => (
            <ListItem
              key={item.title}
              title={item.title}
              description={item.description}
              href={item.href}
            />
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );

  return (
    <nav className="fixed top-0 left-0 w-full bg-white backdrop-blur-xl z-50 shadow-sm px-6 py-4">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-xl font-bold">
        <Image src="/Logo.png" alt="Logo" width={32} height={32} />
          Tutors Connect
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {!isLoggedIn ? (
            beforeLogin.map((item) => (
              <Link key={item.title} href={item.href} className="font-medium text-sm hover:text-blue-600">
                {item.title}
              </Link>
            ))
          ) : (
            <NavigationMenu>
              <NavigationMenuList className="flex gap-3">
                {renderMenu("Dashboard", dashboardMenu)}
                {renderMenu("Teachers", teachersMenu)}
                {renderMenu("Attendance", attendanceMenu)}
                {renderMenu("Achievements", achievementMenu)}
              </NavigationMenuList>
            </NavigationMenu>
          )}

          {/* Avatar */}
          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full p-0 h-10 w-10 border bg-white hover:bg-gray-100 shadow">
                  {userAvatar ? (
                    <Image
                      src={userAvatar}
                      width={40}
                      height={40}
                      alt="Avatar"
                      className="rounded-full"
                    />
                  ) : (
                    <User className="w-6 h-6 text-gray-700" />
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/logout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-6 h-6" />
            </SheetTrigger>

            <SheetContent side="right" className="p-6 w-[80%]">
              <div className="flex flex-col gap-5 mt-6">
                {!isLoggedIn ? (
                  beforeLogin.map((item) => (
                    <Link key={item.title} href={item.href} className="text-lg font-medium">
                      {item.title}
                    </Link>
                  ))
                ) : (
                  <>
                    <Section title="Dashboard" items={dashboardMenu} />
                    <Section title="Teachers" items={teachersMenu} />
                    <Section title="Attendance" items={attendanceMenu} />
                    <Section title="Achievements" items={achievementMenu} />

                    <Button className="w-full mt-4">Logout</Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

// mobile helper
function Section({ title, items }: any) {
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="ml-3 space-y-1">
        {items.map((i: any) => (
          <Link key={i.title} href={i.href} className="text-base block">
            {i.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
