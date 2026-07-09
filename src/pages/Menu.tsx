import Most from "@/components/Most";
import Navbar from "@/components/Navbar";
import Notification from "@/components/Notifications";
import Offer from "@/components/Offer";
import SectionCatItems from "@/components/SectionCatItems";
// import TabsCat from "@/components/TabsCat";
import InstallApp from "@/components/InstallApp";

export default function Menu() {
  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto pt-3 px-4">
        <div className="flex items-center mx-auto px-4 py-2 bg-amber-700 text-amber-100 rounded-2xl">
          <span className="flex-1 ml-2 font-medium text-[13px] text-center">التطبيق في وضع تجربة الشكل فقط</span>
        </div>
      </div>
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
