export type Logo = {
  url: string;
};

export type Page = {
  title: string;
  logo: Logo;
  cardContent: string; // ou tout autre type approprié
  cardImage: string; // ou tout autre type approprié
  buttonText: string;
};
