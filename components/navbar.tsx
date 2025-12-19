// "use client";

// import Link from "next/link"
// import Image from "next/image";
// import { Menu, User, ChevronDown } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";

// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";
// import React from "react";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { RootState } from "@/store/store";
// import { useLogoutUserMutation } from "@/store/api/auth/authApi";
// import { logout, setCredentials } from "@/store/feature/auth/authSlice";
// import { toast } from "sonner";

// /* ===================== TYPES ===================== */
// interface MenuItem {
//   title: string;
//   description?: string;
//   href: string;
// }

// /* ===================== LIST ITEM ===================== */
// function ListItem({ title, description, href }: MenuItem) {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <Link
//           href={href}
//           className="block rounded-md p-3 hover:bg-gray-100 transition"
//         >
//           <div className="font-medium text-gray-900">{title}</div>
//           {description && <p className="text-sm text-gray-500">{description}</p>}
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   );
// }

// /* ===================== NAVBAR ===================== */
// const Navbar = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const { isAuthenticated, user } = useSelector(
//     (state: RootState) => state.auth
//   );

//   const [logoutUser] = useLogoutUserMutation();

//   // ✅ Load from localStorage on mount
//   React.useEffect(() => {
//     const storedUser = localStorage.getItem("authUser");
//     const storedToken = localStorage.getItem("authToken");

//     if (storedUser && storedToken && !isAuthenticated) {
//       dispatch(
//         setCredentials({
//           user: JSON.parse(storedUser),
//           token: storedToken,
//         })
//       );
//     }
//   }, [dispatch, isAuthenticated]);

//   const handleLogout = async () => {
//     try {
//       await logoutUser().unwrap();
//       toast("Logout Successfully!");
//     } catch (err) {
//       console.error("Logout failed", err);
//     }

//     // ✅ Clear Redux state
//     dispatch(logout());

//     // ✅ Clear localStorage
//     localStorage.removeItem("authUser");
//     localStorage.removeItem("authToken");

//     router.push("/login");
//   };

//   const isLoggedIn = isAuthenticated;
//   const userAvatar = user?.avatar;

//   /* ===================== MENUS ===================== */
//   const beforeLogin: MenuItem[] = [
//     { title: "Home", href: "/" },
//     { title: "About", href: "/about" },
//     { title: "Login", href: "/login" },
//   ];

//   const dashboardMenu: MenuItem[] = [
//     // { title: "Overview", description: "Quick insights & summary", href: "/student/overview" },
//     { title: "Performance", description: "Progress reports", href: "/student/performance" },
//     { title: "Schedule", description: "Upcoming classes", href: "/student/schedule" },
//     { title: "Assignments", description: "Tasks & submissions", href: "/student/assignments" },
//     { title: "Reports", description: "Downloadable performance", href: "/student/reports" },
//   ];

//   const teachersMenu: MenuItem[] = [
//     {title: "Nearest Tutor" ,description:"Choose Nearest Tutor" , href:"https://ml-six-xi.vercel.app"},
//     { title: "Teacher List", description: "Browse all teachers", href: "/teachers" },
//     { title: "My Tutors", description: "Your selected tutors", href: "/student/teacherassigned" },
//     { title: "Become a Tutor", description: "Apply as instructor", href: "/signup/SignUpAsTeacher" },
//   ];

//   const attendanceMenu: MenuItem[] = [
//     { title: "Today’s Attendance", description: "Daily presence record", href: "/student/attendance/monthly" },
//   ];

//   const achievementMenu: MenuItem[] = [
//     { title: "Badges", description: "Unlocked badges", href: "/student/achievements/badges" },
//     { title: "Certificates", description: "Earned certificates", href: "/student/achievements/certificates" },
//     { title: "Leaderboard", description: "Top performers", href: "/student/leaderboard" },
//   ];

//     const TeacherNavbarMenu: MenuItem[] = [
//     { title: "CreateTest", description: "Create Test Here", href: "/student/achievements/badges" },
//     { title: "Certificates", description: "Earned certificates", href: "/student/achievements/certificates" },
//     { title: "Leaderboard", description: "Top performers", href: "/student/leaderboard" },
//   ];





//   const renderMenu = (label: string, items: MenuItem[]) => (
//     <NavigationMenuItem>
//       <NavigationMenuTrigger className="text-sm font-semibold flex items-center gap-1">
//         {label}
//         <ChevronDown className="w-4 h-4" />
//       </NavigationMenuTrigger>

//       <NavigationMenuContent>
//         <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
//           {items.map((item) => (
//             <ListItem key={item.title} {...item} />
//           ))}
//         </ul>
//       </NavigationMenuContent>
//     </NavigationMenuItem>
//   );

//   /* ===================== JSX ===================== */
//   return (
//     <nav className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm px-6 py-4">
//       <div className="mx-auto max-w-7xl flex items-center justify-between">

//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-3 text-xl font-bold">
//           <Image src="/logo.png" alt="Logo" width={32} height={32} />
//           Tutors Connect
//         </Link>

//         {/* ===================== DESKTOP ===================== */}
//         <div className="hidden md:flex items-center gap-6">
//           {!isLoggedIn
//             ? beforeLogin.map((item) => (
//                 <Link
//                   key={item.title}
//                   href={item.href}
//                   className="font-medium text-sm hover:text-blue-600"
//                 >
//                   {item.title}
//                 </Link>
//               ))
//             : (
//               <NavigationMenu>
//                 <NavigationMenuList className="flex gap-3">
//                   {renderMenu("Dashboard", dashboardMenu)}
//                   {renderMenu("Teachers", teachersMenu)}
//                   {renderMenu("Attendance", attendanceMenu)}
//                   {renderMenu("Achievements", achievementMenu)}
//                 </NavigationMenuList>
//               </NavigationMenu>
//             )}

//           {/* Avatar Dropdown */}
//           {isLoggedIn && (
//            <DropdownMenu modal={false}>

//               <DropdownMenuTrigger asChild>
//                 <Button className="rounded-full p-0 h-10 w-10 border bg-white hover:bg-gray-100 shadow">
//                   {userAvatar ? (
//                     <Image
//                       src={userAvatar}
//                       width={40}
//                       height={40}
//                       alt="Avatar"
//                       className="rounded-full"
//                     />
//                   ) : (
//                     <User className="w-6 h-6 text-gray-700" />
//                   )}
//                 </Button>
//               </DropdownMenuTrigger>

//               <DropdownMenuContent align="end" className="w-40 ">
//                 {/* <DropdownMenuItem asChild>
//                   <Link href="/student/profile">Profile</Link>
//                 </DropdownMenuItem> */}
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem
//                   onClick={handleLogout}
//                   className="cursor-pointer"
//                 >
//                   Logout
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           )}
//         </div>

//         {/* ===================== MOBILE ===================== */}
//         <div className="md:hidden">
//           <Sheet>
//             <SheetTrigger>
//               <Menu className="w-6 h-6" />
//             </SheetTrigger>

//             <SheetContent side="right" className="p-6 w-[80%] bg-white">
//               <div className="flex flex-col gap-5 mt-6">
//                 {!isLoggedIn
//                   ? beforeLogin.map((item) => (
//                       <Link key={item.title} href={item.href} className="text-lg font-medium">
//                         {item.title}
//                       </Link>
//                     ))
//                   : (
//                     <>
//                       <MobileSection title="Dashboard" items={dashboardMenu} />
//                       <MobileSection title="Teachers" items={teachersMenu} />
//                       <MobileSection title="Attendance" items={attendanceMenu} />
//                       <MobileSection title="Achievements" items={achievementMenu} />
//                       <Button className="w-full mt-4" onClick={handleLogout}>
//                         Logout
//                       </Button>
//                     </>
//                   )}
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>

//       </div>
//     </nav>
//   );
// };

// /* ===================== MOBILE SECTION ===================== */
// function MobileSection({ title, items }: { title: string; items: MenuItem[] }) {
//   return (
//     <div>
//       <h3 className="font-semibold mb-2">{title}</h3>
//       <div className="ml-3 space-y-1">
//         {items.map((item) => (
//           <Link key={item.title} href={item.href} className="text-base block">
//             {item.title}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Navbar;


// ********************************************************Teacher panel**********************

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, User, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

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

import { RootState } from "@/store/store";
import { useLogoutUserMutation } from "@/store/api/auth/authApi";
import { logout, setCredentials } from "@/store/feature/auth/authSlice";
import { toast } from "sonner";

/* ===================== TYPES ===================== */
interface MenuItem {
  title: string;
  description?: string;
  href: string;
}

/* ===================== LIST ITEM ===================== */
function ListItem({ title, description, href }: MenuItem) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block rounded-md p-3 hover:bg-gray-100 transition"
        >
          <div className="font-medium text-gray-900">{title}</div>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

/* ===================== NAVBAR ===================== */
const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const [logoutUser] = useLogoutUserMutation();

  /* ✅ ROLE CHECK */
  const isTeacher = user?.role === "teacher";
  const isStudent = user?.role === "student";

  /* ✅ LOAD AUTH FROM LOCAL STORAGE */
  React.useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken && !isAuthenticated) {
      dispatch(
        setCredentials({
          user: JSON.parse(storedUser),
          token: storedToken,
        })
      );
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      toast.success("Logout Successfully!");
    } catch (err) {
      console.error("Logout failed", err);
    }

    dispatch(logout());
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  const userAvatar = user?.avatar;

  /* ===================== MENUS ===================== */
  const beforeLogin: MenuItem[] = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Login", href: "/login" },
  ];

  const dashboardMenu: MenuItem[] = [
     { title:"Dashboard", description: "Student Dashboard", href: "/student/Dashboard/me" },
    { title: "Performance", description: "Progress reports", href: "/student/performance" },
    { title: "Schedule", description: "Upcoming classes", href: "/student/schedule" },
    { title: "Assignments", description: "Tasks & submissions", href: "/student/assignments" },
    { title: "Reports", description: "Downloadable performance", href: "/student/reports" },
  ];

  const teachersMenu: MenuItem[] = [
    { title: "Nearest Tutor", description: "Choose Nearest Tutor", href: "https://ml-six-xi.vercel.app" },
    { title: "Teacher List", description: "Browse all teachers", href: "/teacherList" },
    { title: "My Tutors", description: "Your selected tutors", href: "/student/teacherassigned" },
    { title: "Become a Tutor", description: "Apply as instructor", href: "/signup/SignUpAsTeacher" },
  ];

  const attendanceMenu: MenuItem[] = [
    { title: "Today’s Attendance", description: "Daily presence record", href: "/student/attendance/monthly" },
  ];

  const achievementMenu: MenuItem[] = [
    { title: "Badges", description: "Unlocked badges", href: "/student/achievements/badges" },
    { title: "Certificates", description: "Earned certificates", href: "/student/achievements/certificates" },
    { title: "Leaderboard", description: "Top performers", href: "/student/leaderboard" },
  ];

  const TeacherNavbarMenu: MenuItem[] = [
    { title: "Create Test", description: "Create Test Here", href: "/teachers/tests/create" },
      { title: "Shows Test", description: "All Tests", href: "/teachers/tests/shows" },
    { title: "My Students", description: "Assigned students", href: "/teacher/students" },
    // { title: "Profile", description: "Manage profile", href: "/teachers/dashboard/me" },
  ];

  const renderMenu = (label: string, items: MenuItem[]) => (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-sm font-semibold flex items-center gap-1">
        {label}
        <ChevronDown className="w-4 h-4" />
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
          {items.map((item) => (
            <ListItem key={item.title} {...item} />
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );

  /* ===================== JSX ===================== */
  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm px-6 py-4">
      <div className="mx-auto max-w-7xl flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 text-xl font-bold">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          Tutors Connect
        </Link>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:flex items-center gap-6">
          {!isAuthenticated ? (
            beforeLogin.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="font-medium text-sm hover:text-blue-600"
              >
                {item.title}
              </Link>
            ))
          ) : (
           <NavigationMenu>
  <NavigationMenuList className="flex gap-3">

    {isStudent && (
      <>
        {renderMenu("Dashboard", dashboardMenu)}
        {renderMenu("Teachers", teachersMenu)}
        {renderMenu("Attendance", attendanceMenu)}
        {renderMenu("Achievements", achievementMenu)}
      </>
    )}

    {isTeacher && (
      <div className="-ml-20">
        {renderMenu("Teacher Panel", TeacherNavbarMenu)}
      </div>
    )}

  </NavigationMenuList>
</NavigationMenu>

          )}

          {/* AVATAR */}
          {isAuthenticated && (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full p-0 h-10 w-10 border bg-white">
                  {userAvatar ? (
                    <Image
                      src={userAvatar}
                      width={40}
                      height={40}
                      alt="Avatar"
                      className="rounded-full"
                    />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-6 h-6" />
            </SheetTrigger>

            <SheetContent side="right" className="p-6 w-[80%] bg-white">
              <div className="flex flex-col gap-5 mt-6">
                {!isAuthenticated ? (
                  beforeLogin.map((item) => (
                    <Link key={item.title} href={item.href} className="text-lg">
                      {item.title}
                    </Link>
                  ))
                ) : (
                  <>
                    {isStudent && (
                      <>
                        <MobileSection title="Dashboard" items={dashboardMenu} />
                        <MobileSection title="Teachers" items={teachersMenu} />
                        <MobileSection title="Attendance" items={attendanceMenu} />
                        <MobileSection title="Achievements" items={achievementMenu} />
                      </>
                    )}

                    {isTeacher && (
                      <MobileSection title="Teacher Panel" items={TeacherNavbarMenu}/>
                    )}

                    <Button className="w-full mt-4" onClick={handleLogout}>
                      Logout
                    </Button>
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

/* ================= MOBILE SECTION ================= */
function MobileSection({ title, items }: { title: string; items: MenuItem[] }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="ml-3 space-y-1">
        {items.map((item) => (
          <Link key={item.title} href={item.href} className="block">
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;





