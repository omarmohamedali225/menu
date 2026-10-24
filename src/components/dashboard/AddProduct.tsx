// import { useAddProduct } from "@/features/dashboard/hooks";
import { useAddProduct, useCategories } from "@/features/dashboard/hooks";
import { Form, Input, Modal, Select } from "antd";
import React from "react";

export default function AddProduct() {
  const [open, setOpen] = React.useState(false);
  const { mutate: add, isPending } = useAddProduct();
  const { data: categories } = useCategories();
  const [form] = Form.useForm();
  return (
    <div className="flex justify-end">
      <button
        onClick={() => setOpen(true)}
        className="border-primary border-2 px-2 py-1 rounded-lg text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors duration-150"
      >
        اضافة منتج
      </button>
      <Modal
        transitionName=""
        maskTransitionName=""
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        footer={false}
        closable={false}
        title={"أضافة منتج"}
      >
        <Form
          form={form}
          initialValues={{ name: null, price: null, category: null }}
          onFinish={(val) => {
            add(
              {
                name: val.name,
                price: val.price,
                category_id: val.category,
              },
              {
                onSuccess: () => {
                  form.resetFields();
                  setOpen(false);
                },
              },
            );
          }}
          layout="vertical"
        >
          <Form.Item
            name={"name"}
            className="flex-1"
            label={"الاسم"}
            rules={[
              {
                required: true,
                min: 1,
                message: "اسم المنتج مطلوب",
              },
            ]}
          >
            <Input id="name" placeholder="كفته او كوارع مثلا" />
          </Form.Item>
          <Form.Item
            name={"category"}
            className="flex-1"
            label={"التصنيف"}
            rules={[
              {
                required: true,
                message: "التصنيف مطلوب",
              },
            ]}
          >
            <Select
              showSearch={{ optionFilterProp: "label" }}
              id="category"
              placeholder="اختار تصنيف"
              options={categories?.map((c) => ({
                key: c.id,
                label: c.name,
                value: c.id,
              }))}
              placement="topLeft"
            />
          </Form.Item>
          <Form.Item
            name={"price"}
            className="flex-1"
            label={"السعر"}
            rules={[
              {
                required: true,
                message: "السعر مطلوب",
              },
            ]}
          >
            <Input id="price" placeholder="10 او 40 مثلا" />
          </Form.Item>

          <button
            disabled={isPending}
            type="submit"
            className="w-full flex justify-center gap-1 mt-2 border-primary border-2 px-2 py-1 rounded-lg text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors duration-150"
          >
            اضافة صنف
            {isPending && (
              <span className="w-6 h-6 border-2 border-l-transparent block rounded-full animate-spin"></span>
            )}
          </button>
        </Form>
      </Modal>
    </div>
  );
}
