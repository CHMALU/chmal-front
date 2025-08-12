import CatalogElementPage from "@/app/components/catalogElementPage/CatalogElementPage";

type IParams = { uslugiName: string };
type PageProps = { params: Promise<IParams> };

export default async function Page({ params }: PageProps) {
  const { uslugiName } = await params;
  return <CatalogElementPage variant="uslugi" slug={uslugiName} />;
}
