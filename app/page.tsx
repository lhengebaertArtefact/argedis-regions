import Link from "next/link";
import { getAllPages, getPage } from "../lib/clients/contentful";
// import Cookies from "js-cookie";

export default async function Home() {
  const pages = await getAllPages();

  return <div className="w-screen h-screen bg-black"></div>;
}
