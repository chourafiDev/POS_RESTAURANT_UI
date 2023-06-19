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
import { RxDash } from "react-icons/rx";
import { BiPlus } from "react-icons/bi";
import Button from "@/components/ui/Button";

interface AddItemProps {
  modalAddOpened: boolean;
  closeModalAdd: () => void;
}

const AddItem: FC<AddItemProps> = ({ modalAddOpened, closeModalAdd }) => {
  const theme = useMantineTheme();

  const [options, setOptions] = useState([""]);

  const handleClick = useCallback(() => {
    // for (let i = 0; i < options.length; i++) {
    //   console.log("type", typeof !options[i]);
    //   if (!options[0]) {
    //     console.log("case 1");
    //     setOptions([...options, ""]);
    //   } else if (i > 0 || !options[i]) {
    //     console.log("case 2");
    //     setOptions([...options]);
    //   } else {
    //     console.log("case 3");
    //     setOptions([...options, ""]);
    //   }
    // }
    if (options.length >= 10) {
      return;
    } else {
      setOptions([...options, ""]);
    }
  }, [options]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const onchangeVal: any = [...options];
    onchangeVal[index] = value;
    setOptions(onchangeVal);
  };

  const handleDelete = (index: number) => {
    const deleteVal = [...options];
    deleteVal.splice(index, 1);
    setOptions(deleteVal);
  };

  return (
    <Modal
      opened={modalAddOpened}
      onClose={closeModalAdd}
      withCloseButton={true}
      centered
      title="Add Item"
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
          defaultValue={1}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              : "$ "
          }
          className="mt-4"
        />

        <div className="bg-gray-light/40 rounded-lg my-6 p-3 border border-gray-light/70">
          <div className="flex items-center justify-between gap-2 mb-2">
            <label className="text-sm text-gray font-medium">Options</label>
            {options.length >= 10 && (
              <p className="text-sm text-brand font-medium">
                You have 10 options maximim
              </p>
            )}
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

          <div className="grid grid-cols-2 gap-2">
            {options.map((val, index) => (
              <div key={index} className="flex items-center gap-1">
                <input
                  name="option"
                  value={val}
                  onChange={(e) => handleChange(e, index)}
                  className="input"
                />
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="bg-gray-light text-red rounded-full w-8 h-8 border border-gray/10 flex justify-center items-center"
                >
                  <RxDash size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <FileInput
          label="Upload Image"
          placeholder="choose image"
          icon={<FiUpload size={rem(14)} />}
        />

        <div className="flex items-center gap-4 mt-10">
          <Button variant="default" size="default" rounded="full">
            Add
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddItem;
