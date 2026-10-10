import { Button, Form, Input, Modal, Select, Space } from "antd";
import React from "react";

export default function AddProduct() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} className="mb-4">اضافة منتج</Button>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={false}
        closable={false}
      >
        <Form
          initialValues={{}}
          onFinish={(val) => {
            console.log(val);
          }}
        >
          <div className="flex gap-2">
            <Form.Item name={"name"} className="flex-1">
              <Input placeholder="اسم المنتج" />
            </Form.Item>

            <Form.Item name={"category"}>
              <Select placeholder={"التصنيف"} />
            </Form.Item>
          </div>
          <div className="flex gap-2">
            <Form.Item name={"price"} className="flex-1">
              <Input placeholder="السعر" />
            </Form.Item>

            <Form.Item name={"discount"}>
              <Input placeholder="الخصم" type={"number"} />
            </Form.Item>
          </div>
          <Space wrap>
            <Form.List name={"extra"}>
              {(field, { add }) => (
                <>
                  {field.map(({ key, name }) => (
                    <Space wrap className="flex gap-2" key={key}>
                      <Form.Item name={name} className="flex-1">
                        <Input placeholder="الاسم" />
                      </Form.Item>

                      <Form.Item name={name}>
                        <Input placeholder="السعر" type={"number"} />
                      </Form.Item>
                    </Space>
                  ))}
                  <Button onClick={() => add()} className="w-fit mr-2">
                    + اضافة
                  </Button>
                </>
              )}
            </Form.List>
          </Space>

          <Button type={"primary"} htmlType="submit">
            اضافة منتج
          </Button>
        </Form>
      </Modal>
    </>
  );
}
