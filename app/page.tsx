import Link from "next/link";
import { getPage } from "../lib/clients/contentful";

export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const pages = await getPage(locale);

  return (
    <div className="header">
      {pages.map((el: any, index: any) => (
        <div key={index} style={{ backgroundColor: "green" }}>
          <Link href={`/${el.sys.id}`}>{el.title}</Link>
        </div>
      ))}
    </div>
  );
}
