import type { TypeCategory } from "@/types/Products";
import { Form, Input, Modal, Select } from "antd";
type Type = {
  id: number;
  name: string;
  category: string;
  categoryId: string;
  price: string;
  countExtra: number;
  extra: string[];
  is_available: boolean;
};
export default function EditItem({
  select,
  remove,
  data,
}: {
  select: Type | null;
  remove: (t: null) => void;
  data: { categories: TypeCategory[]; extras: { id: string; name: string }[] };
}) {
  return (
    <Modal
      open={Boolean(select)}
      okText="حفظ"
      cancelText="الغاء"
      onCancel={() => remove(null)}
    >
      <h1 className="text-xl font-medium mb-5">تعديل منتج</h1>
      <Form>
        <Form.Item name={"name"}>
          <Input placeholder="اسم المنتج" value={select?.name} />
        </Form.Item>
        <Form.Item name="category">
          <Select
            placeholder="التصنيف"
            defaultValue={select?.category}
            showSearch
            options={data.categories?.map((c, i) => ({
              id: i,
              label: c.name,
              value: c.name,
            }))}
          />
        </Form.Item>
        <Form.Item name="price">
          <Input placeholder="السعر" value={select?.price} />
        </Form.Item>
        <Form.Item name={"extras"}>
          <Select
            placeholder="الاضافات"
            defaultValue={select?.extra}
            options={data.extras?.map((e) => ({
              key: e.id,
              label: e.name,
              value: e.name,
            }))}
            mode="multiple"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
