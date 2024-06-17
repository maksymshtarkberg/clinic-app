"use client";
import { Button } from "@/components/ui/button";
import {
  getSessionToken,
  isSessionTokenExpired,
  useDescope,
  useSession,
  useUser,
} from "@descope/nextjs-sdk/client";

import Image from "next/image";
import React, { useCallback, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../../../public/logo.svg";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "@/app/i18n/client";

function Header({ lng }) {
  const { user } = useUser();
  const { isAuthenticated } = useSession();
  const { t } = useTranslation(lng, "second-page");

  const router = useRouter();
  const sdk = useDescope();

  useEffect(() => {
    console.log(isAuthenticated);
    console.log(user);
  }, [user]);

  const handleLogout = useCallback(() => {
    sdk.logout();
  }, [sdk]);

  return (
    <div
      className="flex items-center p-5 shadow-sm flex  justify-between
    "
    >
      <div className="flex items-center gap-8 ">
        <Image src={logo} alt="logo" width={180} height={100} />
        <div
          className="md:flex items-center
            gap-6 hidden
            "
        >
          <Link
            href={`/${lng}`}
            className="hover:scale-105 hover:text-primary
                cursor-pointer"
          >
            Home
          </Link>
          <h2
            className="hover:scale-105 hover:text-primary
                cursor-pointer"
          >
            Services
          </h2>
          <h2
            className="hover:scale-105 hover:text-primary
                cursor-pointer"
          >
            About Us
          </h2>
        </div>
      </div>
      <LanguageSelector lng={lng} />

      <div>
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={user?.picture}
                alt="user"
                width={40}
                height={40}
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/${lng}/myaccount`}>My Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/${lng}/mybooking`}>My Booking</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button onClick={() => router.push(`/${lng}/login`)}>Login</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
