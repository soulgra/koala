"use client";
import { ChevronsDown, Menu } from "lucide-react";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/stores/use-auth";
import Image from "next/image";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/#features",
    label: "Features",
  },
  {
    href: "/#team",
    label: "Team",
  },
  {
    href: "https://github.com/",
    label: "Github",
  },
];
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  return (
    <header className="sticky top-5 z-40 mx-auto flex w-[90%] items-center justify-between rounded-2xl border border-secondary bg-card bg-opacity-15 p-2 shadow-inner md:w-[70%] lg:w-[75%] lg:max-w-screen-xl">
      <Logo />

      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-br-2xl rounded-tr-2xl border-secondary bg-card"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <div className="mr-2 h-9 w-9 overflow-hidden rounded-lg">
                      <Image
                        src="/assets/images/koala.png"
                        alt="Koala Logo"
                        width={36}
                        height={36}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    Koala
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
              <div className="mt-6 flex flex-col items-start justify-start gap-4">
                <Button asChild variant={"secondary"} className="w-full">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="mx-auto hidden lg:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link href={href} className="px-2 text-base">
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden items-center gap-4 lg:flex">
        {isAuthenticated ? (
          <Button asChild>
            <Link href="/dashboard">Open Dashboard</Link>
          </Button>
        ) : (
          <>
            {" "}
            <Button asChild variant={"secondary"}>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>{" "}
          </>
        )}
      </div>
    </header>
  );
};
