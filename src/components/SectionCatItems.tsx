import Cat from "@/components/Cat";
import Item from "@/components/Item";

type SectionTypes = {
  catName: string;
};

export default function SectionCatItems({ catName }: SectionTypes) {
  return (
    <div className="max-w-2xl mx-auto py-3 px-4">
      <Cat catName={catName} />

      <div className="flex flex-col gap-2">
        {items.map((e, i) => (
          <Item data={e} key={i} />
        ))}
      </div>
    </div>
  );
}

const items = [
  {
    id: 1,
    category: "Main Dishes",
    name: "Grill Chicken",
    description: "Delicious grilled chicken with a hint of spices.",
    price: 200,
    offer: null,
  },
  {
    id: 2,
    category: "Main Dishes",
    name: "Beef Steak",
    description: "Juicy beef steak served with fresh vegetables and sauce.",
    price: 350,
    offer: "SPECIAL OFFER",
  },
  {
    id: 3,
    category: "Main Dishes",
    name: "Chicken Alfredo",
    description: "Creamy pasta with grilled chicken and parmesan cheese.",
    price: 180,
    offer: null,
  },
  {
    id: 4,
    category: "Main Dishes",
    name: "Fried Chicken Meal",
    description: "Crispy fried chicken served with fries and special sauce.",
    price: 150,
    offer: "SPECIAL OFFER",
  },
];
