import {
  getAllPages,
  getAllProducerId,
  getAllRegionsId,
  getPage,
  getRegion,
} from "@/lib/clients/contentful";
import Link from "next/link";

export async function generateStaticParams({
  params,
}: {
  params: { producersmap: any; region: any; locale: string };
}) {
  const { producersmap, locale } = params;
  const pages: any = await getPage(params.locale);

  const gg: any[] = [];
  pages.forEach((e: any) => {
    e.producersRefCollection?.items?.forEach((ee: any) => {
      gg.push(
        {
          region: e.sys.id,
          locale: "fr",
          producersmap: ee.sys.id,
        },
        {
          region: e.sys.id,
          locale: "en",
          producersmap: ee.sys.id,
        }
      );
    });
  });
  return gg;
}

export default async function Producersmap({
  params,
}: {
  params: { region: any; locale: string; producersmap: string };
}) {
  const { locale } = params;
  const { region } = params;
  const { producersmap } = params;

  // const regionLang: any = await getRegion(region, locale);

  // Fonction pour générer une position aléatoire dans une plage spécifique
  const getPosition = (min: any, max: any) => {
    return Math.floor(Math.random() * (max - min + 1) + min) + "px";
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {/* <img src={regionLang.logo.url} alt="region de france" />
      {regionLang.producersRefCollection.items.map((element: any) => (
        <Link
          key={element.sys.id}
          href={`/${region}/${locale}/${element.sys.id}/${element.producer}`}
          style={{
            position: "absolute",
            top: getPosition(0, 500), // positions verticales
            left: getPosition(0, 700), // positions horizontales
            backgroundColor: "red",
            padding: "20px",
            borderRadius: "50%",
            opacity: 0.5,
          }}
        >
          {element.producer}
        </Link>
      ))} */}
    </div>
  );
}

// {producersId} {regionLang}
// {regionId}
