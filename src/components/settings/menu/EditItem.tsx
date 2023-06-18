"use client";

import {
  Input,
  Modal,
  NumberInput,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { FC, useCallback, useState } from "react";
import { FileInput, rem } from "@mantine/core";
import { FiUpload } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import Button from "@/components/ui/Button";

interface EditItemProps {
  modalEditOpened: boolean;
  closeModalEdit: () => void;
}

const EditItem: FC<EditItemProps> = ({ modalEditOpened, closeModalEdit }) => {
  const theme = useMantineTheme();

  const [data, setData] = useState([{ option: "" }]);

  const handleClick = useCallback(() => {
    setData([...data, { option: "" }]);
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const onchangeVal: any = [...data];
    onchangeVal[index][name] = value;
    setData(onchangeVal);
  };

  const handleDelete = (index: number) => {
    const deleteVal = [...data];
    deleteVal.splice(index, 1);
    setData(deleteVal);
  };

  return (
    <Modal
      opened={modalEditOpened}
      onClose={closeModalEdit}
      withCloseButton={true}
      centered
      title="Edit Item"
      overlayProps={{
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      size="xl"
    >
      <form className="px-4 pb-7 form">
        <Input.Wrapper id="title" label="Title">
          <Input id="title" />
        </Input.Wrapper>
        <Textarea label="Description" autosize minRows={3} className="mt-4" />
        <NumberInput
          label="Price"
          defaultValue={1000}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              : "$ "
          }
          className="mt-4"
        />

        <div className="bg-gray-light/40 rounded-lg my-6 p-3 border border-gray-light/70">
          <div className="flex items-center justify-between gap-2">
            <label className="text-sm text-gray font-medium">Options</label>
            <div className="inline-block">
              <Button
                variant="default"
                size="sm"
                rounded="full"
                type="button"
                onClick={handleClick}
              >
                <BiPlus size={20} /> Add
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {data.map((val, index) => (
              <div key={index} className="flex items-center gap-1">
                <input
                  name="option"
                  value={val.option}
                  onChange={(e) => handleChange(e, index)}
                  className="input"
                />
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="bg-gray-light text-red rounded-md w-11 h-11 flex justify-center items-center"
                >
                  <MdClose size={20} />
                </button>
              </div>
            ))}
          </div>
          {/* <p>{JSON.stringify(data)}</p> */}
        </div>

        <FileInput
          label="Upload Image"
          placeholder="choose image"
          icon={<FiUpload size={rem(14)} />}
        />

        <div className="flex items-center gap-4 mt-10">
          <Button variant="default" size="default" rounded="full">
            Edit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditItem;
