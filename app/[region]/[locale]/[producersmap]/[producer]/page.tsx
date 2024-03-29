import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { getAllPages, getProducerName } from "@/lib/clients/contentful";

export async function generateStaticParams() {
  const pages: any = await getAllPages();

  const gg: any[] = [];
  pages.forEach((e: any) => {
    e.producersRefCollection?.items?.forEach((ee: any) => {
      gg.push(
        {
          region: e.sys.id,
          locale: "en",
          producersmap: e.sys.id,
          producer: ee.sys.id,
        },
        {
          region: e.sys.id,
          locale: "fr",
          producersmap: e.sys.id,
          producer: ee.sys.id,
        }
      );
    });
  });
  return gg;
}

export default async function ProducersPage({
  params,
}: {
  params: {
    region: string;
    locale: string;
    producersmap: string;
    producer: string;
  };
}) {
  const { region, locale, producer } = params;
  // j'ai un seul nom qui est extrait
  const selectedProducer: any = await getProducerName(producer, locale);

  return (
    <main className="">
      {documentToReactComponents(selectedProducer.producerDescription.json)}
      <div>{producer}</div>
      <div>{locale}</div>
      <div>{region}</div>
      <div>{selectedProducer.producer}</div>
    </main>
  );
}
