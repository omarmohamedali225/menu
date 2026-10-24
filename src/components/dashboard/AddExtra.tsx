import { useAddExtra } from "@/features/dashboard/hooks";
import { Form, Input, Modal } from "antd";
import { useState } from "react";

export default function AddExtra() {
  const [open, setOpen] = useState(false);
  const { mutate: add, isPending } = useAddExtra();
  const [form] = Form.useForm();
  return (
    <div className="flex justify-end">
      <button
        onClick={() => setOpen(true)}
        className="border-primary border-2 px-2 py-1 rounded-lg text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors duration-150"
      >
        أضافة جديدة
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
        title={"أضافة جديدة"}
      >
        <Form
          form={form}
          initialValues={{ name: null, price: 0 }}
          onFinish={(val) => {
            add(
              {
                name: val.name,
                price: val.price,
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
            label={"اسم الاضافة"}
            rules={[
              {
                required: true,
                min: 3,
                message: "اسم الاضافة مطلوب اقل حاجه 3 حروف",
              },
            ]}
          >
            <Input id="name" placeholder="زياده مخلل" />
          </Form.Item>
          <Form.Item
            name={"price"}
            className="flex-1"
            label={"سعر الاضافة"}
            rules={[
              {
                required: true,
                message: "سعر الاضافة مطلوب",
              },
            ]}
          >
            <Input id="price" type={"number"} placeholder="12جنية" />
          </Form.Item>

          <button
            disabled={isPending}
            type="submit"
            className="w-full flex justify-center gap-1 mt-2 border-primary border-2 px-2 py-1 rounded-lg text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors duration-150"
          >
            اضافة
            {isPending && (
              <span className="w-6 h-6 border-2 border-l-transparent block rounded-full animate-spin"></span>
            )}
          </button>
        </Form>
      </Modal>
    </div>
  );
}
