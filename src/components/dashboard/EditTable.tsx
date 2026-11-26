import { Input, Select } from "antd";
import { memo, useState } from "react";

function EditTableText({
  id,
  value,
  onSave,
  type,
  suffix = "",
}: {
  id: number;
  type: "text" | "price";
  value: string;
  onSave: (id: number, v: string) => void;
  suffix?: string;
}) {
  const [edit, setEdit] = useState(false);
  return edit ? (
    <Input
      defaultValue={value}
      autoFocus
      onBlur={() => setEdit(false)}
      onPressEnter={(e) => {
        const v = e.currentTarget.value.trim();

        if (type === "price" && isNaN(Number(v))) return;

        if (v !== "" && v !== value) {
          onSave(id, v);
        }
        setEdit(false);
      }}
    />
  ) : (
    <span
      onDoubleClick={() => {
        setEdit(true);
      }}
      className="select-none block"
    >
      {value} {suffix}
    </span>
  );
}
function EditTableStatus({
  id,
  value,
  onSave,
}: {
  id: number;
  value: boolean;
  onSave: (id: number, v: boolean) => void;
}) {
  const [edit, setEdit] = useState(false);
  return edit ? (
    <Select
      size="small"
      classNames={{ content: "w-[150px]!" }}
      defaultValue={value}
      defaultOpen
      options={[
        { id: 1, label: "متاح", value: true },
        { id: 2, label: "غير متوفر", value: false },
      ]}
      onBlur={() => setEdit(false)}
      onChange={(e) => {
        if (e !== value) {
          onSave(id, e);
        }
        setEdit(false);
      }}
      autoFocus
    />
  ) : (
    <span
      onDoubleClick={(e) => {
        e.preventDefault();
        setEdit(true);
      }}
      className={`${value ? "bg-green-200" : "bg-red-200"} rounded-full select-none px-2 py-0.5 text-[11px]`}
    >
      {value ? " متاح " : " غير متاح "}
    </span>
  );
}
function EditTableCategory({
  categoryId,
  categoryName,
  onSave,
  option,
}: {
  categoryId: number;
  categoryName: string;
  onSave: (id: number, v: string) => void;
  option: { value: string; label: string }[];
}) {
  const [edit, setEdit] = useState(false);

  return edit ? (
    <Select
      classNames={{ content: "w-[150px]!" }}
      defaultValue={categoryId}
      defaultOpen
      options={option}
      onBlur={() => setEdit(false)}
      onChange={(e) => {
        if (e && String(e) !== String(categoryId)) {
          onSave(categoryId, String(e));
        }
        setEdit(false);
      }}
      autoFocus
    />
  ) : (
    <span
      onDoubleClick={() => {
        setEdit(true);
      }}
      className="select-none"
    >
      {categoryName}
    </span>
  );
}

export const EditText = memo(EditTableText);
export const EditStatus = memo(EditTableStatus);
export const EditCategory = memo(EditTableCategory);
