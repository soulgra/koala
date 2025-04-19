"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

type Props = {
  classes?: {
    root?: string;
    logo?: string;
    logoIcon?: string;
  };
  href?: string;
  isSidebarOpen?: boolean;
};

export const Logo = memo(
  ({ classes, href = "/", isSidebarOpen = true }: Props) => {
    return (
      <Link
        href={href}
        className={cn("flex items-center text-lg font-bold", classes?.root)}
      >
        <div
          className={cn(
            "mr-2 flex !aspect-square !size-9 items-center justify-center rounded-lg overflow-hidden",
            classes?.logo,
          )}
        >
          <Image
            src="/assets/images/koala.png"
            alt="Koala Logo"
            width={36}
            height={36}
            className="object-cover"
          />
        </div>
        {isSidebarOpen ? "Koala" : null}
      </Link>
    );
  },
);

Logo.displayName = "Logo";
