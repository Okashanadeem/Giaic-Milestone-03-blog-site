'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import Link from "next/link";

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
          Menu
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>BlogSphere</SheetTitle>
          <SheetDescription>
            Navigate through the menu options below.
          </SheetDescription>
        </SheetHeader>

        <div className={`flex flex-col space-y-4 ${isOpen ? "block" : "hidden"}`}>
          <Link href="/" className="text-indigo-600 hover:text-indigo-800">
            Home
          </Link>
          <Link href="#" className="text-indigo-600 hover:text-indigo-800">
            About
          </Link>
          <Link href="/blog" className="text-indigo-600 hover:text-indigo-800">
            Blog
          </Link>
          <Link href="/contact" className="text-indigo-600 hover:text-indigo-800">
            Contact
          </Link>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" className="mt-4 w-full bg-indigo-600 text-white hover:bg-indigo-700">
              Subscribe
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
