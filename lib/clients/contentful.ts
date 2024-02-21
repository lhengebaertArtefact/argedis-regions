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

export const getAllPages = async (): Promise<any | null> => {

  let query = ` {
    pageCollection {
      items {
        title
        sys {
          id
        }
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
              sys {
                id
              }
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

export const getPage = async (locale: string): Promise<any | null> => {
  const transformLocale = locale === "fr" ? "fr" : "en-US"
  let query = ` {
    pageCollection(locale : "${transformLocale}") {
      items {
        title
        sys {
          id
        }
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
              sys {
                id
              }
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

export const getAllRegionsId = async (slug: any): Promise<any | null> => {

    let query = `{
      pageCollection(where: {sys: { id: "${slug}" } }) {
      items {
          sys {
            id
          }
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
                sys {
                  id
                }
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
    return res.data.pageCollection.items.map((element : any) => {element.sys.id}) || null;
}


export const getRegion = async (slug: any, locale: string): Promise<any | null> => {

  const transformLocale = locale === "fr" ? "fr" : "en-US"

    let query = `{
      pageCollection(where: {sys: { id: "${slug}" } }, locale : "${transformLocale}") {
      items {
          sys {
            id
          }
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
                sys {
                  id
                }
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
    return res.data.pageCollection.items[0] || null;
}

export const getAllProducerId = async (slug: any): Promise<any | null> => {

  let query = `{
    producerCollection(where : { sys : { id: "${slug}"}}) {
      items {
        sys {
          id
        }
        producer
        producerPhoto {
          url
        }
        producerDescription{
          json
        }
      }
    }
  }`;

  const res = await fetchContentfulData(query);
  const producer: any | null = res.data.producerCollection?.items.map((element : any) => element.sys.id)

  return producer;
};

export const getProducerLocale = async (locale: string, producerName: string ): Promise<any | null> => {

  const transformLocale = locale === "fr" ? "fr" : "en-US"

  let query = `{
    producerCollection(locale: "${transformLocale}") {
      items {
        sys {
          id
        }
        producer
        producerPhoto {
          url
        }
        producerDescription{
          json
        }
      }
    }
  }`;

  const res = await fetchContentfulData(query);
  const producer: any | null = res.data.producerCollection?.items.find((element : any) => element.producer === producerName)

  return producer;
};

export const getAllProducersNames = async (): Promise<any | null> => {

  let query = `{
    producerCollection {
      items {
        sys {
          id
        }
        producer
        producerPhoto {
          url
        }
        producerDescription{
          json
        }
      }
    }
  }`;

  const res = await fetchContentfulData(query);
  const producer: any | null = res.data.producerCollection?.items.map((element: any) => element.producer)

  return producer;
};

export const getProducerName = async (slug: any, locale: string): Promise<any | null> => {

  const transformLocale = locale === "fr" ? "fr" : "en-US"

  let query = `{
    producerCollection(where : { sys : { id: "${slug}"}}, locale: "${transformLocale}") {
      items {
        sys {
          id
        }
        producer
        producerPhoto {
          url
        }
        producerDescription{
          json
        }
      }
    }
  }`;

  const res = await fetchContentfulData(query);
  const producer: any | null = res.data.producerCollection?.items[0].producer

  return producer;
};





