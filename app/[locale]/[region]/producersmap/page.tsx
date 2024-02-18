import { getPage, getRegion } from "@/lib/clients/contentful";
import Link from "next/link";

export async function generateStaticParams() {
  const locale = "fr" || "en";
  const pages: any = await getPage(locale);

  return pages.map((element: any) => ({
    region: element.title,
  }));
}

export default async function RegionIdPage({
  params,
}: {
  params: { region: any; locale: string };
}) {
  console.log("langue", params);
  const { region } = params;
  const { locale } = params;
  const selectedRegion: any = await getRegion(region, locale);

  // Fonction pour générer une position aléatoire dans une plage spécifique
  const getPosition = (min: any, max: any) => {
    return Math.floor(Math.random() * (max - min + 1) + min) + "px";
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <img src={selectedRegion.logo.url} alt="region de france" />
      {selectedRegion.producersRefCollection.items.map((element: any) => (
        <Link
          key={element.producer}
          href={`/${region}/producersmap/${element.producer}`}
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
      ))}
    </div>
  );
}
