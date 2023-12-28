import Income from "@/components/dashbord/Income";
import Statistics from "@/components/dashbord/statistcis/Statistics";
import Sales from "@/components/dashbord/Sales";
import LatestOrders from "@/components/dashbord/LatestOrders";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <>
      <Statistics locale={locale} />

      <div className="flex items-stretch gap-4 mt-8">
        <Sales locale={locale} />
        <Income locale={locale} />
      </div>

      <LatestOrders locale={locale} />
    </>
  );
}
