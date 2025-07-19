export interface HeroData {
  title: string;
  subtitle: string;
  buttonText: string;
  image: { url: string; alt?: string };
}

export interface StatsData {
  value1: string;
  label1: string;
  value2: string;
  label2: string;
  value3: string;
  label3: string;
}

export interface ServicesData {
  title: string;
  subtitle: string;
  buttonText: string;
}

export interface ProductsData {
  title: string;
  subtitle: string;
  buttonText: string;
}

export interface CTAData {
  subtitle: string;
  sectionTitle: string;
  buttonText: string;
}

export interface WPPageACF {
  heroData: HeroData;
  statsData: StatsData;
  servicesData: ServicesData;
  productsData: ProductsData;
  ctaData: CTAData;
}

export interface WPPage {
  acf: WPPageACF;
}

export interface CatalogItem {
  order: string | number;
  name: string;
  image: { url: string; alt?: string };
  price: string;
  promise: string;
  descTitle: string;
  description: string;
}

export interface WPCatalogEntry {
  acf: { catalogItem: CatalogItem };
}
