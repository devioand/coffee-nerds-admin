"use client";

import { ROUTES } from "@/routes";
import { Package, ShoppingCart, Table, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NAV_ITEMS = [
  {
    label: "Orders",
    href: ROUTES.ORDERS,
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  { label: "Tables", href: ROUTES.TABLES, icon: <Table className="h-5 w-5" /> },
  {
    label: "Products",
    href: ROUTES.PRODUCTS,
    icon: <Package className="h-5 w-5" />,
  },
  {
    label: "Customers",
    href: ROUTES.CUSTOMERS,
    icon: <Users className="h-5 w-5" />,
  },
];

export const DesktopNavItems = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-2">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center text-[18px] gap-3 rounded-lg ${
              isActive && "bg-muted text-primary"
            } px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
          >
            {item.icon}
            {item.label}
            {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              6
            </Badge> */}
          </Link>
        );
      })}
    </div>
  );
};

export const MobileNavItems = () => {
  const pathname = usePathname();
  return (
    <>
      {NAV_ITEMS.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`mx-[-0.65rem] ${
              isActive && "text-foreground bg-muted"
            } flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
          >
            {item.icon}
            {item.label}
            {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          6
        </Badge> */}
          </Link>
        );
      })}
    </>
  );
};
