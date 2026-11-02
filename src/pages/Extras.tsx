import AddExtra from "@/components/dashboard/AddExtra";
import ExtrasItems from "@/components/dashboard/ExtrasItems";

export default function Extras() {
  return (
    <div className="p-4 space-y-3">
      <h1>إدارة الإضافات</h1>
      <h3 className="text-sm text-mute">
        قوم باضافة او تعديل الاضافات لكل صنف
      </h3>
      {/* shorts */}
      <AddExtra />
      <ExtrasItems />
    </div>
  );
}
