import React from 'react'

const Note = () => {
  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values) => submiteHundler(values)}
  >
    {(formik) => (
      <form className="form" onSubmit={formik.handleSubmit}>
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
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full outline-none border border-gray/20 bg-[#F5F5F5] rounded-xl px-3 py-[11px] text-dark/80 focus:border-brand"
            >
              <option className="py-2" value="" label="Select a role" />
              <option className="py-2" value="User" label="User" />
              <option className="py-2" value="Cashier" label="Cashier" />
            </select>

           
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
      </form>
    )}
  </Formik>
  )
}

export default Note