import { getAllPages, getPage, getRegion } from "@/lib/clients/contentful";
import Link from "next/link";
import Cookies from "js-cookie";

export async function generateStaticParams() {
  const pages: any = await getAllPages();
  const staticParams: any[] = [];

  for (const page of pages) {
    const { id } = page.sys;

    staticParams.push(
      { region: id, locale: "fr" },
      { region: id, locale: "en" }
    );
  }

  return staticParams;
}

export default async function LangChoice({
  params,
}: {
  params: { region: any; locale: string };
}) {
  const { region } = params;
  const { locale } = params;

  return (
    <div>
      <div> Choisissez votre langue</div>

      <Link href={`/${region}/${locale}/${region}`}>Suivant</Link>

      <Link href={`/${region}/fr/`}>FR</Link>
      <Link href={`/${region}/en/`}>EN</Link>
    </div>
  );
}
