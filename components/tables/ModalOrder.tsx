import { useState, FC } from "react";
import Button from "@/components/ui/Button";
import { Divider, Form, Input, Modal, SelectProps } from "antd";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { addTableOrder } from "@/redux/features/cartSlice";

type SizeType = Parameters<typeof Form>[0]["size"];

interface ModalOrderProps {
  openModal: boolean;
  handleCloseModal: () => void;
  selectedTables: number[];
  number: string;
  locale: string;
}

const ModalOrder: FC<ModalOrderProps> = ({
  openModal,
  handleCloseModal,
  selectedTables,
  number,
  locale,
}) => {
  const router = useRouter();
  const [form] = Form.useForm();

  const guests = ["1", "2", "3", "4", "5", "Outher"];
  const options: SelectProps["options"] = [];

  for (let i = 1; i < 50; i++) {
    options.push({
      value: i,
      label: `T-${i}`,
    });
  }

  // handle select guest
  const [selectedGuest, setSelectedGuest] = useState<string>("");

  const selectGuest = (item: string) => {
    return setSelectedGuest(item);
  };

  // handle add order
  const dispatch = useAppDispatch();
  const handleAddOrder = (values: any) => {
    const { fullname, phone } = values;

    const data = {
      number,
      tables: selectedTables,
      guests: selectedGuest,
      customer: { fullname, phone },
    };

    dispatch(addTableOrder(data));
    router.push(`/${locale}/menu`);
  };

  return (
    <Modal
      centered
      open={openModal}
      onOk={handleCloseModal}
      onCancel={handleCloseModal}
      closeIcon={false}
      width={700}
      footer={[]}
    >
      <Form
        form={form}
        name="add-order"
        className="w-full"
        scrollToFirstError
        layout="vertical"
        autoComplete="off"
        onFinish={handleAddOrder}
        requiredMark={false}
        size={"large" as SizeType}
      >
        <div className="p-5">
          <div className="text-center mb-6">
            <h2 className="text-dark font-medium text-xl mb-1">New Order</h2>
            <p className="text-gray font-light text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>

          <div>
            <Divider orientation="center">Order Info</Divider>

            <label className="text-sm text-dark">Tables Selected</label>
            <ul className="flex gap-2 items-center mt-1">
              {selectedTables.map((el) => (
                <li
                  key={el}
                  className="border border-yellow rounded-lg px-6 py-1 text-dark font-medium"
                >
                  T-{el}
                </li>
              ))}
            </ul>

            <div className="mt-3">
              <label className="text-sm text-dark">Guest</label>
              <ul className="flex items-center gap-2 mt-1">
                {guests.map((guest) => (
                  <li
                    className={`tag ${
                      selectedGuest === guest
                        ? "border-brand bg-brand/20 text-brand"
                        : "border-gray/30 bg-gray-light/20 text-gray"
                    }`}
                    key={guest}
                    onClick={() => selectGuest(guest)}
                  >
                    {guest}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <Divider orientation="center">Customer Info</Divider>
            <Form.Item
              name="fullname"
              label="Full Name"
              rules={[
                {
                  required: true,
                  message: "Full Name is required!",
                },
              ]}
              className="mb-3"
            >
              <Input className="w-full" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                {
                  required: true,
                  message: "Phone is required!",
                },
              ]}
            >
              <Input className="w-full" />
            </Form.Item>
          </div>

          <Button variant="default" size="default" rounded="default">
            Book & Order
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalOrder;
