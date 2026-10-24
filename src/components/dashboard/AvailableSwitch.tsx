import { useAvailable } from "@/features/dashboard/hooks";
import { Switch } from "antd";
type keys = "offers" | "extras" | "products" | "categories";

export default function AvailableSwitch({
  id,
  value,
  table,
}: {
  id: number | string;
  value: boolean;
  table: keys;
}) {
  const { mutate, isPending } = useAvailable();
  return (
    <Switch
      checkedChildren={"نشط"}
      unCheckedChildren={"معطل"}
      classNames={{ root: "mt-auto!" }}
      loading={isPending}
      checked={value}
      onChange={(c) => {
        mutate({
          id: id,
          bool: c,
          table: table,
        });
      }}
    />
  );
}
