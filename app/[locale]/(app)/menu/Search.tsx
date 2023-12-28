"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImSearch } from "react-icons/im";
import { Image, Select } from "antd";
import { useGetCategoriesQuery } from "@/redux/services/categoryApiSlice";

const { Option } = Select;

const Search = () => {
  // Fetch all categories
  const { data: categories } = useGetCategoriesQuery(null);

  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const router = useRouter();

  return (
    <form
      action={(formData) => {
        const lng = localStorage.getItem("i18nextLng");
        const searchTerm = formData.get("searchTerm") || "all";

        // if (!formData.get("searchTerm")) return;

        const params = new URLSearchParams();

        if (category) params.set("category", category.toString());
        if (minPrice) params.set("min_price", minPrice.toString());
        if (maxPrice) params.set("max_price", maxPrice.toString());

        router.push(`/${lng}/menu/${searchTerm}?${params.toString()}`);
      }}
      className="flex items-start gap-4 w-[40%]"
    >
      <div>
        <div className="flex items-center bg-white px-4 gap-2 rounded-md w-full">
          <ImSearch className="text-dark/40" size={17} />
          <input
            type="text"
            className="outline-none px-2 py-3 bg-white font-normal w-[500px] text-sm text-gray/50"
            placeholder="Search menu"
            name="searchTerm"
          />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Select
            className="w-full"
            placeholder="Category"
            size="large"
            onChange={(value) => setCategory(value)}
          >
            {categories?.map(({ name, icon, _id }) => (
              <Option value={name} key={_id}>
                <div className="flex items-center gap-2">
                  <Image src={icon?.url} alt="burger" width={20} height={20} />
                  <p>{name}</p>
                </div>
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Min Price"
            className="w-full"
            size="large"
            onChange={(value) => setMinPrice(value)}
            options={[
              { value: "5", label: "$5" },
              { value: "10", label: "$10" },
              { value: "50", label: "$50" },
              { value: "100", label: "$100" },
              { value: "150", label: "$150" },
              { value: "200", label: "$200" },
            ]}
          />
          <Select
            placeholder="Max Price"
            className="w-full"
            size="large"
            onChange={(value) => setMaxPrice(value)}
            options={[
              { value: "5", label: "$5" },
              { value: "10", label: "$10" },
              { value: "50", label: "$50" },
              { value: "100", label: "$100" },
              { value: "150", label: "$150" },
              { value: "200", label: "$200" },
            ]}
          />
        </div>
      </div>
      <Button
        className="gap-2"
        variant="default"
        size="default"
        rounded="default"
      >
        Search
      </Button>
    </form>
  );
};

export default Search;
