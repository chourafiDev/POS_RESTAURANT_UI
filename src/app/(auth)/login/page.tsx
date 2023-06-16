import Form from "@/components/login/Form";
import SwiperSlider from "@/components/login/SwiperSlider";

const page = () => {
  return (
    <div className="grid grid-cols-2">
        <SwiperSlider />
        <Form />
    </div>
  );
};

export default page;
