import Card from "@/app/[locale]/components/Card";
import { getPage, getProducer } from "@/lib/clients/contentful";

export async function generateStaticParams() {
  const locale = "fr" || "en";

  const pages: any = await getPage(locale);
  const findProducer = pages.find(
    (element: any) => element.producersRefCollection?.items
  );
  const itemProducer = findProducer.producersRefCollection.items;

  return itemProducer.map((element: any) => ({
    producer: element.producer,
  }));
}

export default async function ProducersPage({
  params,
}: {
  params: { producer: any; locale: string };
}) {
  const { producer } = params;
  const { locale } = params;
  const selectedProducer = await getProducer(producer, locale);

  const myProducer = selectedProducer.filter(
    (element: any) => typeof element === "object"
  );

  const name = myProducer[0].producer;

  return (
    <main className="">
      <Card data={myProducer} numCard={name} />
    </main>
  );
}
