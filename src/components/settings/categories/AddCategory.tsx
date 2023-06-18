"use client";

import {
  Avatar,
  Group,
  Input,
  Modal,
  Select,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { FC, useState, forwardRef } from "react";
import Button from "@/components/ui/Button";

const data = [
  {
    image: "/assets/imgs/icons/dish.png",
    label: "Dish",
    value: "dish",
    description: "Not just a sponge",
  },
  {
    image: "/assets/imgs/icons/burger.png",
    label: "Burger",
    value: "burger",
    description: "Not just a sponge",
  },
  {
    image: "/assets/imgs/icons/juice.png",
    label: "Juice",
    value: "juice",
    description: "Not just a sponge",
  },
  {
    image: "/assets/imgs/icons/salad.png",
    label: "Salad",
    value: "salad",
    description: "Not just a sponge",
  },
  {
    image: "/assets/imgs/icons/taco.png",
    label: "Taco",
    value: "taco",
    description: "Not just a sponge",
  },
  {
    image: "/assets/imgs/icons/dessert.png",
    label: "Dessert",
    value: "dessert",
    description: "Not just a sponge",
  },
  {
    image: "/assets/imgs/icons/sushi.png",
    label: "Sushi",
    value: "sushi",
    description: "Not just a sponge",
  },
  {
    image: "/assets/imgs/icons/pizza.png",
    label: "Pizza",
    value: "pizza",
    description: "Not just a sponge",
  },
  {
    image: "/assets/imgs/icons/meat.png",
    label: "Meat",
    value: "meat",
    description: "Not just a sponge",
  },
  {
    image: "/assets/imgs/icons/cake.png",
    label: "Cake",
    value: "cake",
    description: "Not just a sponge",
  },
  {
    image: "/assets/imgs/icons/doughnut.png",
    label: "Doughnut",
    value: "doughnut",
    description: "Not just a sponge",
  },
];

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} size={26} />

        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  )
);

SelectItem.displayName = "SelectItem";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string;
}

interface AddCategoryProps {
  modalAddOpened: boolean;
  closeModalAdd: () => void;
}

const AddCategory: FC<AddCategoryProps> = ({
  modalAddOpened,
  closeModalAdd,
}) => {
  const theme = useMantineTheme();

  return (
    <Modal
      opened={modalAddOpened}
      onClose={closeModalAdd}
      withCloseButton={true}
      centered
      title="Add Category"
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
      <form className="mt-6 px-7 pb-7 form">
        <p className="text-dark fon-medium mb-8">
          Create a new category by filling the information below
        </p>

        <Input.Wrapper id="name" label="Name">
          <Input id="name" />
        </Input.Wrapper>

        <Select
          className="mt-4"
          label="Category Icon"
          placeholder="Pick one"
          itemComponent={SelectItem}
          dropdownPosition="top"
          data={data}
          searchable
          maxDropdownHeight={150}
          nothingFound="No category here"
          filter={(value, item) =>
            item.label!.toLowerCase().includes(value.toLowerCase().trim())
          }
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

export default AddCategory;
