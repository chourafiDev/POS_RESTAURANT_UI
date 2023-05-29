import Form from "@/components/login/Form";
import SwiperSlider from "@/components/login/SwiperSlider";

const page = () => {
  return (
    <div className="grid grid-cols-3">
      <div>
        <SwiperSlider />
      </div>
      <div>
        <Form />
      </div>
    </div>
  );
};

export default page;
