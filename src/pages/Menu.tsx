import Most from "@/components/Most";
import Notification from "@/components/Notifications";
import Offer from "@/components/Offer";
import SectionCatItems from "@/components/SectionCatItems";
// import TabsCat from "@/components/TabsCat";
import InstallApp from "@/components/InstallApp";
import Details from "@/components/Details";

export default function Menu() {
  return (
    <>
    {/* <Details/> */}
      <Notification />
      <InstallApp />
      <Offer />
      <Most />
      {/* <TabsCat /> */}
      <SectionCatItems catName="Main Dishes" />
      <SectionCatItems
        catName="Desserts
"
      />
      <SectionCatItems
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
      />
    </>
  );
}
