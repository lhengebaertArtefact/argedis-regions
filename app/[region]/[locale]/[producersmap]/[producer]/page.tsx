import Card from "@/app/components/Card";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import {
  getAllProducersNames,
  getPage,
  getProducerLocale,
  getProducerName,
} from "@/lib/clients/contentful";

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
          locale: "en",
          producersmap: ee.sys.id,
          producer: ee.producer,
        },
        {
          region: e.sys.id,
          locale: "fr",
          producersmap: ee.sys.id,
          producer: ee.producer,
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
    producer: any;
    locale: string;
    region: string;
    producersmap: string;
  };
}) {
  const { producer } = params;
  const { locale } = params;
  const { region } = params;
  const { producersmap } = params;

  return (
    <main className="">
      {/* {documentToReactComponents(dataProducer.producerDescription.json)}
      {allProducersNames}
      <div>{selectedProducer}</div> */}
      <div>{producer}</div>
      <div>{locale}</div>
      <div>{region}</div>
      <div>{producersmap}</div>
    </main>
  );
}

// // j'ai un seul nom qui est extrait
// const selectedProducer: any = await getProducerName(producersmap, locale);

// // j'ai un objet producer unique
// const dataProducer: any = await getProducerLocale(locale, producer);

// const allProducersNames: any = await getAllProducersNames();
