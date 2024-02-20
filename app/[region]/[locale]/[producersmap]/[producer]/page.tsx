import Card from "@/app/components/Card";
import { getPage, getProducer } from "@/lib/clients/contentful";

export async function generateStaticParams({
  params,
}: {
  params: { producersmap: any; region: any; locale: string };
}) {
  const { producersmap, region, locale } = params;
  const pages: any = await getPage(params.locale);
  const findProducer = pages.find(
    (element: any) => element.producersRefCollection?.items
  );
  const itemProducer = findProducer.producersRefCollection.items;

  const gg: any[] = [];
  pages.forEach((e: any) => {
    e.producersRefCollection?.items?.forEach((ee: any) => {
      gg.push({
        producersmap: e.sys.id,
        region: e.sys.id,
        producer: ee.producer,
      });
    });
  });

  return gg;
}

export default async function ProducersPage({
  params,
}: {
  params: { producer: any; locale: string; region: string };
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
