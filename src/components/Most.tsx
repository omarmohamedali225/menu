import Cat from "@/components/Cat";
import ItemMost from "@/components/ItemMost";

const items = Array.from({ length: 6 }).fill("");

export default function Most() {
  return (
    <div className="max-w-2xl mx-auto py-3 px-4">
      <Cat catName="Most Ordered 🔥" />
      <div className="grid grid-cols-2 gap-4">
        {items.map((_, i) => (
          <ItemMost key={i} />
        ))}
      </div>
    </div>
  );
}
