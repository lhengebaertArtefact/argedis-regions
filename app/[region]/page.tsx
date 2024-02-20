import { getPage, getRegion } from "@/lib/clients/contentful";
import Link from "next/link";

export async function generateStaticParams({
  params,
}: {
  params: { region: any; locale: string };
}) {
  const pages: any = await getPage(params.locale);
  return pages.map((element: any) => ({
    region: element.sys.id,
  }));
}

export default async function LangChoice({
  params,
}: {
  params: { region: any; locale: any };
}) {
  const { region } = params;

  return (
    <div>
      <div> Choisissez votre langue</div>

      <Link href={`/${region}/fr/producersmap`}>FR</Link>
      <Link href={`/${region}/en/producersmap`}>EN</Link>
    </div>
  );
}
