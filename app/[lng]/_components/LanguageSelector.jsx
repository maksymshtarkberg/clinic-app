"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trans } from "react-i18next";
import { languages } from "@/app/i18n/settings";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";

const LanguageSelector = ({ lng }) => {
  const { t } = useTranslation(lng, "language");

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DropdownMenuLabel>{t(`language.${lng}`)}</DropdownMenuLabel>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <Trans i18nKey="languageSwitcher" t={t}>
            {languages
              .filter((l) => lng !== l)
              .map((l, index) => {
                return (
                  <Link href={`/${l}`} key={index}>
                    <DropdownMenuItem key={l} className="cursor-pointer">
                      {t(`language.${l}`)}
                      <DropdownMenuSeparator />
                    </DropdownMenuItem>
                  </Link>
                );
              })}
          </Trans>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default LanguageSelector;
