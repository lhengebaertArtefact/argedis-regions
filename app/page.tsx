import Link from "next/link";
import { getAllPages, getPage } from "../lib/clients/contentful";
// import Cookies from "js-cookie";

export default async function Home() {
  const pages = await getAllPages();

  return (
    <div className="header">
      {pages.map((el: any, index: any) => (
        <div key={index} style={{ backgroundColor: "green" }}>
          <Link href={`/${el.sys.id}/fr`}>{el.title}</Link>
        </div>
      ))}
    </div>
  );
}
