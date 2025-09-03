export interface NavbarData {
  navbar_text: string;
  navbar_logo: { url: string; alt?: string };

  navbar_phone: string;
  navbar_phone_href: string;

  emailAddress: string;

  navbar_hours_workdays: string;
  navbar_hours_sat: string;
}

export interface FooterData {
  footer_text_under_logo: string;
  footer_title: string;
  footer_contact_text: string;
  footer_copyright_text: string;
}

export interface WPPageNav {
  acf: {
    navbar: NavbarData;
    footer: FooterData;
  };
}

export interface HeroData {
  title: string;
  subtitle: string;
  image: { url: string; alt?: string };
}

export interface ButtonSettings {
  buttonText: string;
  buttonLink: string;
}

export interface StatsData {
  value1: string;
  label1: string;
  value2: string;
  label2: string;
  value3: string;
  label3: string;
}

export interface PriceCatalogData {
  prefixCeny: string;
  walutaCeny: string;
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
}

export interface BrandsData {
  title: string;
}

export interface BrandFields {
  title: string;
  logo: { url: string; alt?: string };
  link: string;
}

export interface WPBrandEntry {
  id: number;
  acf: {
    brandFields: BrandFields;
  };
}

export interface AwardsData {
  sectionTitle: string;
  description: string;
}

export interface CertificateData {
  certificateTitle: string;
  certificateDescription: string;
  certificateImage: { url: string; alt?: string };
  point1Title: string;
  point1Description: string;
  point2Title: string;
  point2Description: string;
  point3Title: string;
  point3Description: string;
}

export interface WPCertificateEntry {
  acf: {
    certificateData: CertificateData;
  };
}

export interface TestimonialsData {
  title: string;
  subtitle: string;
}

export interface BlogData {
  title: string;
  subtitle: string;
}

export interface BlogItem {
  blogTitle: string;
  blogDate: string;
  blogContent: string;
  blogImage: {
    url: string;
    alt?: string;
  };
}

export interface WPBlogEntry {
  id: number;
  acf: {
    blogData: BlogItem;
  };
}

export interface FAQData {
  title: string;
  subtitle: string;
  question1: string;
  answer1: string;
  question2: string;
  answer2: string;
  question3: string;
  answer3: string;
  question4: string;
  answer4: string;
}

export interface seoData {
  title: string;
  description: string;
  steps_title: string;
  steps_description: string;
  premium_title: string;
  premium_description: string;
  why_title: string;
  why_point: string;
  fleet_title: string;
  fleet_description: string;
  warranty_title: string;
  warranty_description: string;
}

export interface ContactData {
  label: string;
  title: string;
  clientsTitle: string;

  point1_bold: string;
  point1_normal: string;
  point2_bold: string;
  point2_normal: string;
  point3_bold: string;
  point3_normal: string;
  point4_bold: string;
  point4_normal: string;

  phoneTitle: string;
  phoneNumber: string;
  emailTitle: string;
  emailAddress: string;
  openingHours: string;
}

export interface WPPage {
  acf: {
    heroData: HeroData;
    buttonSettings: ButtonSettings;
    statsData: StatsData;
    priceCatalogData: PriceCatalogData;
    servicesData: ServicesData;
    productsData: ProductsData;
    ctaData: CTAData;
    brandsData: BrandsData;
    awardsData: AwardsData;
    testimonialsData: TestimonialsData;
    blogData: BlogData;
    faqData: FAQData;
    seoData: seoData;
    contactData: ContactData;
  };
}

//! ===========================================================================
export type SubpageVariant = "uslugi" | "produkty";

export interface CatalogItemACF {
  order: string | number;
  name: string;
  image: { url: string; alt?: string };
  price: string;
  promise: string;
  explanation: string;
  descTitle: string;
  description: string;
}

//? Normal type for products and services
export interface CatalogItem extends CatalogItemACF {
  id: number;
  slug: string;
  variant: SubpageVariant;
}

export interface WPCatalogEntry {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: { catalogItem: CatalogItemACF };
}

//? Extended type for services
export interface VariantACF {
  title: string;
  subtitle: string;
  price: string;
  time: string;
}

export interface ServiceItemACF extends CatalogItemACF {
  variant1: VariantACF;
  variant2: VariantACF;
  variant3: VariantACF;
  variant4: VariantACF;
  variant5: VariantACF;
  variant6: VariantACF;
  variant7: VariantACF;
  variant8: VariantACF;
  variant9: VariantACF;
  variant10: VariantACF;
}

export interface ServiceItem extends ServiceItemACF {
  id: number;
  slug: string;
  variant: SubpageVariant;
}

export interface WPServiceEntry {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: { catalogItem: ServiceItem };
}
//?

export interface allCatalogData {
  sectionTitle: string;
  subtitle: string;
}

export interface catalogBenefitsData {
  tytulSekcjiBenefity: string;
  benefit1Naglowek: string;
  benefit1Opis: string;
  benefit2Naglowek: string;
  benefit2Opis: string;
  benefit3Naglowek: string;
  benefit3Opis: string;
  benefit4Naglowek: string;
  benefit4Opis: string;
}

export interface TireBrandsPoint {
  title: string;
  description: string;
}

export interface TireBrand {
  imageUrl: string;
  imageAlt: string;
  brandLogoUrl: string;
  brandLogoAlt: string;
  certificateDescription: string;
  point1: TireBrandsPoint;
  point2: TireBrandsPoint;
  point3: TireBrandsPoint;
  secondaryButtonLabel: string;
  secondaryButtonUrl: string;
}

export interface TireBrandsData {
  sectionTitle: string;
  sectionSubtitle: string;
  brand1: TireBrand;
  brand2: TireBrand;
}

export interface WPPageCatalog {
  acf: {
    allCatalogData: allCatalogData;
    pageServiceDataBenefits: catalogBenefitsData;
    tireBrandsData: TireBrandsData;
  };
}
