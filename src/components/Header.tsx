"use client";

import Link from "next/link";
import { HeaderRightContent } from "./HeaderRightContent";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/">Pokemon</Link>
        </div>

        <div className="flex flex-1 items-center space-x-4 justify-end">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};
