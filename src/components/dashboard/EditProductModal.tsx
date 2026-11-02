import { useEdit, useExtras } from "@/features/dashboard/hooks";
import { Form, Modal, Select } from "antd";
import { useEffect } from "react";

type Type = {
  id: number;
  name: string;
  category: { name: string; id: string };
  categoryId: string;
  price: string;
  countExtra: number;
  extra: { name: string; id: number }[];
  is_available: boolean;
};

interface Props {
  product: Type | null;
  onClose: () => void;
}

export default function EditProductModal({ product, onClose }: Props) {
  const { mutate, isPending } = useEdit();
  const [form] = Form.useForm();
  const { data: extras } = useExtras();

  useEffect(() => {
    if (!product) return;
    form.setFieldsValue({
      extras: product.extra.map((e) => ({
        key: e.id,
        label: e.name,
        value: e.id,
      })),
    });
  }, [product, form]);
  return (
    <Modal
      open={Boolean(product)}
      okText="حفظ"
      confirmLoading={isPending}
      onOk={() => {
        form.submit();
      }}
      cancelText="الغاء"
      onCancel={onClose}
    >
      <h1 className="text-xl font-medium mb-5">تعديل منتج</h1>
      <Form
        form={form}
        onFinish={(v) => {
          if (product && product.id) {
            mutate(
              {
                id: product.id,
                extras: v.extras.map((e: number) => e),
              },
              { onSuccess: onClose },
            );
          }
        }}
        layout="vertical"
      >
        <Form.Item name={"extras"} label={"اضافات"}>
          <Select
            placeholder="سيبها فاضية لو مش عايز اضافات"
            options={extras?.map((e) => ({
              key: e.id,
              label: e.name,
              value: e.id,
            }))}
            mode="multiple"
            classNames={{ root: "w-[70%]!" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
