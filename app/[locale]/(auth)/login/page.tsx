import Form from "@/components/login/Form";
import SwiperSlider from "@/components/login/SwiperSlider";

const page = ({ params: { locale } }: { params: { locale: string } }) => {
  return (
    <>
      <div className="grid grid-cols-2">
        <SwiperSlider />
        <Form locale={locale} />
      </div>
    </>
  );
};

export default page;
