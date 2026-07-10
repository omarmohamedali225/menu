import Cat from "@/components/Cat";
import Details from "@/components/Details";
import ItemMost from "@/components/ItemMost";
import { useState } from "react";

export default function Most() {
  const [product, setProduct] = useState(null);
  return (
    <>
      <Cat catName="Most Ordered 🔥" />
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, i) => (
          <ItemMost
            key={i}
            product={item}
            onclick={() => {
              setProduct(item);
            }}
          />
        ))}
      </div>
      {product && (
        <Details
          product={product}
          onclick={() => {
            setProduct(null);
          }}
        />
      )}
    </>
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
