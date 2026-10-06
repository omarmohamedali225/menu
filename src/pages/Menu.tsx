// import Notification from "@/components/Notifications";
import Offer from "@/components/menu/Offer";
import SectionCatItems from "@/components/menu/SectionCatItems";
import TabsCat from "@/components/menu/TabsCat";
// import TabsCat from "@/components/TabsCat";
// import InstallApp from "@/components/InstallApp";
import { supabase } from "./../../supabase";
import { useEffect, useState } from "react";
import type { CategoriesType } from "@/types/Products";

// const categories = [
//   // { key: "1", label: "Most Ordered 🔥" },
//   { key: "2", label: "Desserts" },
//   { key: "3", label: "Desserts2" },
//   { key: "4", label: "Desserts3" },
// ];

export default function Menu() {
  const [categories, setCategories] = useState<CategoriesType[] | null>(null);

  useEffect(() => {
    async function data() {
      const res = await supabase.from("categories").select("*");
      setCategories(res.data);
    }
    data();
  }, []);

  return (
    <>
      {/* <Details/> */}
      {/* <Notification /> */}
      {/* <InstallApp /> */}
      <Offer />
      {/* <SectionCatItems catName={"Most Ordered 🔥"} /> */}
      {categories && <TabsCat categories={categories} />}
      {categories?.map((cat) => (
        <SectionCatItems key={cat.id} data={cat} />
      ))}
      {/* <SectionCatItems
        catName="Sandwiches
"
      />
      <SectionCatItems
        catName="Pasta
"
      />
      <SectionCatItems
        catName="Fast Meals

"
      />
      <SectionCatItems
        catName="Hawawshi

"
      />
      <SectionCatItems
        catName="Chicken

"
      />
      <SectionCatItems
        catName="Beverages

"
      /> */}
    </>
  );
}
