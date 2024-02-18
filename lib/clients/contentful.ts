import { createClient } from "contentful";

import { Page } from "../types";


const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
});

const fetchContentfulData = async (query: string): Promise<any> => {

  const res: any = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,

    {
      method: "POST",
      cache: "no-cache",
      headers: {
        'Authorization': `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }
  );
  const data = res.json();
  return data;
};

export const getPage = async (locale: string): Promise<any | null> => {
  const transformLocale = locale === "fr" ? "fr" : "en-US"
  let query = ` {
    pageCollection(locale : "${transformLocale}") {
      items {
        title
        logo {
          url
        }
        cardContent {
          json
        }
        cardImage {
          url
        }
        producersRefCollection(limit: 10) {
          limit
          items {
            ... on Producer {
              producer
              buttonText
              producerPhoto {
                url
              }
              producerDescription {
                json
              }
            }
          }
        }
      }
    }
  }`;
  const res = await fetchContentfulData(query);
  const pages: any = res.data.pageCollection.items || [];

  // Si vous attendez une seule page, vous pouvez simplement retourner la première
  // page de la liste ou null si la liste est vide
  return pages;
}

export const getRegion = async (slug: string, locale: string): Promise<any | null> => {

  const transformLocale = locale === "fr" ? "fr" : "en-US"
  let query = `{
    pageCollection(where: { title: "${slug}" }, locale : "${transformLocale}") {
      items {
        title
        logo {
          url
        }
        cardContent {
          json
        }
        cardImage {
          url
        }

        producersRefCollection(limit: 10) {
          limit
          items {
            ... on Producer {
              producer
              buttonText
              producerPhoto {
                url
              }
              producerDescription {
                json
              }
            }
          }
        }
      }
    }
  }`;

  const res = await fetchContentfulData(query);
  const region: any | null = res.data.pageCollection.items[0] || null;

  return region;
};


export const getProducer = async (slug: string, locale: string ): Promise<any | null> => {

  const transformLocale = locale === "fr" ? "fr" : "en-US"

  let query = `{
    pageCollection(locale : "${transformLocale}") {
      items {
        title
        logo {
          url
        }
        cardContent {
          json
        }
        cardImage {
          url
        }

        producersRefCollection(limit: 10) {
          limit
          items {
            ... on Producer {
              producer
              buttonText
              producerPhoto {
                url
              }
              producerDescription {
                json
              }
            }
          }
        }
      }
    }
  }`;

  const res = await fetchContentfulData(query);
  const producer: any | null = res.data?.pageCollection?.items[0].producersRefCollection?.items.map((element : any) => element.producer === slug && element) 

  return producer;
};





