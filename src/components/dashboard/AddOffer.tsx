import { useAddOffer } from "@/features/dashboard/hooks";
import { Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

export default function AddOffer() {
  const [open, setOpen] = useState(false);
  const { mutate: add, isPending } = useAddOffer();
  const [form] = Form.useForm();
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="float-end border-primary border-2 px-2 py-1 rounded-lg text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors duration-150"
      >
        اضافة عرض
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
        title={"أضافة عروض"}
      >
        <Form
          form={form}
          initialValues={{ title: null, description: null, price: null }}
          onFinish={(val) => {
            add(
              {
                title: val.title,
                description: val.description,
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
            name={"title"}
            className="flex-1"
            label={"اسم العرض"}
            rules={[
              {
                required: true,
                min: 3,
                message: "اسم العرض مطلوب اقل حاجه 3 حروف",
              },
            ]}
          >
            <Input id="title" placeholder="لمة الصحاب" />
          </Form.Item>
          <Form.Item
            name={"description"}
            className="flex-1"
            label={"تفاصيل العرض"}
            rules={[
              {
                required: true,
                min: 3,
                message: "تفاصيل العرض مطلوب اقل حاجه 3 حروف",
              },
            ]}
          >
            <TextArea id="description" placeholder="كفتة ونص فرخة" />
          </Form.Item>

          <Form.Item
            name={"price"}
            className="flex-1"
            label="سعر العرض"
            rules={[
              {
                required: true,
                message: "سعر العرض مطلوب",
              },
            ]}
          >
            <Input type={'number'} placeholder="10 جنية مثلا" />
          </Form.Item>

          <button
            disabled={isPending}
            type="submit"
            className="w-full flex justify-center gap-1 mt-2 border-primary border-2 px-2 py-1 rounded-lg text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors duration-150"
          >
            اضافة العرض
            {isPending && (
              <span className="w-6 h-6 border-2 border-l-transparent block rounded-full animate-spin"></span>
            )}
          </button>
        </Form>
      </Modal>
    </>
  );
}
