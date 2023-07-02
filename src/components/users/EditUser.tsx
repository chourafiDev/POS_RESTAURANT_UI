"use client";

import {
  Input,
  Loader,
  // Modal,
  PasswordInput,
  useMantineTheme,
} from "@mantine/core";
import { FC, useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import { FileInput, rem } from "@mantine/core";
import { FiUpload } from "react-icons/fi";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BiCopyAlt } from "react-icons/bi";
import { LuSettings2 } from "react-icons/lu";
import generator from "generate-password";
import { Field, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useCreateUserMutation } from "@/redux/services/userApiSlice";
import { Select } from "antd";
import { Modal } from "antd";

interface AddUserProps {
  openModalEdit: boolean;
  handleCloseModal: (type: string) => void;
}

// Initial values
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  image: "",
  phone: "",
  role: "",
  password: "",
  address: "",
};

const validFileExtensions = ["jpg", "png", "jpeg"];

const EditUser: FC<AddUserProps> = ({ openModalEdit, handleCloseModal }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imagePrev, setImagePrev] = useState<string>("");

  //Validation schema with YUP
  const phoneRegExp = /^(0)\d{9}$/;

  const validationSchema = Yup.object({
    firstName: Yup.string().required("This field is required!"),
    lastName: Yup.string().required("This field is required!"),
    email: Yup.string()
      .required("This field is required!")
      .email("Invalide Email Address!"),
    role: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
    address: Yup.string().required("This field is required!"),
    phone: Yup.string()
      .required("This field is required!")
      .matches(phoneRegExp, "Invalid mobile phone"),
    image: Yup.mixed()
      .required("This field is required!")
      .test(
        "is-file-of-correct-type",
        "Invalid type of file, accept (png, jpg, jpeg)",
        isValidFileType
      )
      .test(
        "is-file-too-big",
        "The maximum size allowed is less than 5MB",
        isValidFileSize
      ),
  });

  // Check type extension of CV file
  function isValidFileType() {
    let valid = true;

    const file = fileRef.current?.files?.[0] as File;
    console.log("file", file);
    if (file) {
      const type = file.type.split("/")[1];

      if (!validFileExtensions.includes(type)) {
        valid = false;
      }
    }

    return valid;
  }

  // Check size of CV file
  function isValidFileSize() {
    let valid = true;
    const file = fileRef.current?.files?.[0] as File;
    const size = file.size / (1024 * 1024); //3MB

    if (size > 3) {
      valid = false;
    }

    return valid;
  }

  // handle click file upload
  const handleClickFile = () => {
    fileRef.current?.click();
  };

  // Convert CV file to base64
  function convertToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const base64String = fileReader.result;
        // const base64String = fileReader?.result?.split(",")[1];
        resolve(base64String);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  // Generate password
  const generatePwd = (formik: any) => {
    const password = generator.generate({
      length: 8,
      numbers: true,
    });
    formik.setFieldValue("password", password);
  };

  // Copy password
  const copyPwd = async (formik: any) => {
    await navigator.clipboard.writeText(formik.values.password);
    // toast.success("Password copied successfully");
  };

  // handle create new user
  const [addNewUser, { isLoading, isSuccess, isError }] =
    useCreateUserMutation();

  const submiteHundler = async (values: any) => {
    console.log("values", values);

    try {
      await addNewUser(values);
    } catch (err: any) {
      console.log("errrror", err.data?.message || err.error);
      // toast.error(err.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      // toast.success("User added successfully");
    }
  }, [isSuccess]);

  return (
    <Modal
      // opened={modalAddOpened}
      // onClose={closeModalAdd}
      // withCloseButton={true}
      // centered
      // title="Add User"
      // overlayProps={{
      //   color:
      //     theme.colorScheme === "dark"
      //       ? theme.colors.dark[9]
      //       : theme.colors.gray[2],
      //   opacity: 0.55,
      //   blur: 3,
      // }}
      // size="xl"
      title="Add New User"
      open={openModalEdit}
      onOk={() => handleCloseModal("edit")}
      onCancel={() => handleCloseModal("edit")}
      centered
      width={1000}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => submiteHundler(values)}
      >
        {(formik) => (
          <form className="mt-6 px-4 pb-7 form" onSubmit={formik.handleSubmit}>
            <div>
              <div
                onClick={handleClickFile}
                className="p-4 flex flex-col items-center gap-2 bg-[#F5F5F5] text-brand rounded-lg hover:bg-[#F5F5F5]/50 duration-300 ease-in cursor-pointer"
              >
                <AiOutlineCloudUpload className="w-6 h-6" />
                <span>Choose some files to upload</span>
                <input
                  type="file"
                  name="image"
                  ref={fileRef}
                  onBlur={formik.handleBlur}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.currentTarget?.files?.[0] as File;
                    convertToBase64(file).then((res) => {
                      // Override cv_base64 in initialValues
                      formik.setFieldValue("image", res);

                      const type = file.type.split("/")[1];
                      // if (validFileExtensions.includes(type)) {
                      setImagePrev(file.name);
                      // }
                    });
                  }}
                />
              </div>
              {/* display selected files */}
              {imagePrev && (
                <div className="bg-gray-light p-2 rounded-md mt-2">
                  <p className="text-dark text-[12px]">{imagePrev}</p>
                </div>
              )}

              {formik.touched.image && formik.errors.image ? (
                <p className="text-red text-sm font-normal mt-1">
                  {formik.errors.image}
                </p>
              ) : null}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <Input.Wrapper id="firstName" label="First Name">
                <Input
                  id="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <p className="text-red text-sm font-normal mt-1">
                    {formik.errors.firstName}
                  </p>
                ) : null}
              </Input.Wrapper>
              <Input.Wrapper id="lastName" label="Last Name">
                <Input
                  id="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <p className="text-red text-sm font-normal mt-1">
                    {formik.errors.lastName}
                  </p>
                ) : null}
              </Input.Wrapper>
            </div>

            <Input.Wrapper id="email" label="Email" className="mt-6">
              <Input
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red text-sm font-normal mt-1">
                  {formik.errors.email}
                </p>
              ) : null}
            </Input.Wrapper>

            <Input.Wrapper id="address" label="Address" className="mt-6">
              <Input
                id="address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address ? (
                <p className="text-red text-sm font-normal mt-1">
                  {formik.errors.address}
                </p>
              ) : null}
            </Input.Wrapper>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Input.Wrapper id="phone" label="Phone">
                <Input
                  id="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <p className="text-red text-sm font-normal mt-1">
                    {formik.errors.phone}
                  </p>
                ) : null}
              </Input.Wrapper>
              <div className="mt-2">
                <label className="text-sm text-gray font-semibold block">
                  Role
                </label>
                {/* <select
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full outline-none border border-gray/20 bg-[#F5F5F5] rounded-xl px-3 py-[11px] text-dark/80 focus:border-brand"
                >
                  <option className="py-2" value="" label="Select a role" />
                  <option className="py-2" value="User" label="User" />
                  <option className="py-2" value="Cashier" label="Cashier" />
                </select> */}

                <Select
                  // defaultValue="lucy"
                  // style={{ width: 120 }}
                  className="w-full"
                  placeholder="Select role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "cashier", label: "Cashier" },
                  ]}
                />

                {formik.touched.role && formik.errors.role ? (
                  <p className="text-red text-sm font-normal mt-1">
                    {formik.errors.role}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 my-6 bg-gray-light/20 border border-gray-light/40 rounded-xl p-4">
              <Input.Wrapper
                id="password"
                className=""
                label="Generate Password"
              >
                <Input id="password" disabled value={formik.values.password} />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-red text-sm font-normal mt-1">
                    {formik.errors.password}
                  </p>
                ) : null}
              </Input.Wrapper>

              <div className="flex items-end gap-2">
                <Button
                  variant="default"
                  size="sm"
                  rounded="full"
                  onClick={() => generatePwd(formik)}
                  type="button"
                  className="gap-1"
                >
                  Generate
                  <LuSettings2 size={17} />
                </Button>
                {formik.values.password === "" ? (
                  <Button
                    variant="disabled"
                    size="sm"
                    rounded="full"
                    disabled
                    type="button"
                    className="gap-1"
                  >
                    copy <BiCopyAlt />
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    rounded="full"
                    onClick={() => copyPwd(formik)}
                    type="button"
                    className="gap-1"
                  >
                    copy <BiCopyAlt />
                  </Button>
                )}
              </div>
            </div>

            {isLoading ? (
              <Button
                variant="disabled"
                size="default"
                rounded="full"
                className="gap-2"
              >
                Add <Loader color="#073b4c" size="xs" />
              </Button>
            ) : (
              <Button
                variant="default"
                size="default"
                rounded="full"
                type="submit"
              >
                Add
              </Button>
            )}
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditUser;
