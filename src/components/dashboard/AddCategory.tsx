import { useAddCategory } from "@/features/menu/hooks";
import { Form, Input, Modal } from "antd";
import { useState } from "react";

export default function AddCategory() {
  const [open, setOpen] = useState(false);
  const { mutate: add, isPending } = useAddCategory();
  const [form] = Form.useForm();
  return (
    <div className="flex justify-end">
      <button
        onClick={() => setOpen(true)}
        className="border-primary border-2 px-2 py-1 rounded-lg text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors duration-150"
      >
        اضافة تصنيف
      </button>
      <Modal
        transitionName=""
        maskTransitionName=""
        open={open}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        footer={false}
        closable={false}
        title={"أضافة تصنيف"}
      >
        <Form
          form={form}
          initialValues={{ name: null, slug: null }}
          onFinish={(val) => {
            add(
              {
                name: val.name,
                slug: val.slug,
              },
              { onSuccess: () => setOpen(false) },
            );
          }}
          layout="vertical"
        >
          <Form.Item
            name={"name"}
            className="flex-1"
            label={"اسم التصنيف عربي"}
            rules={[
              {
                required: true,
                min: 3,
                message: "اسم التصنيف مطلوب اقل حاجه 3 حروف",
              },
            ]}
          >
            <Input id="title" placeholder="مشويات او مشروبات" />
          </Form.Item>
          <Form.Item
            name={"slug"}
            className="flex-1"
            label={"اسم التصنيف انجليزي"}
            rules={[
              {
                required: true,
                min: 3,
                message: "اسم التصنيف انجليزي مطلوب اقل حاجه 3 حروف",
              },
            ]}
          >
            <Input id="slug" placeholder="drink" />
          </Form.Item>

          <button
            disabled={isPending}
            type="submit"
            className="w-full flex justify-center gap-1 mt-2 border-primary border-2 px-2 py-1 rounded-lg text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors duration-150"
          >
            اضافة تصنيف
            {isPending && (
              <span className="w-6 h-6 border-2 border-l-transparent block rounded-full animate-spin"></span>
            )}
          </button>
        </Form>
      </Modal>
    </div>
  );
}
