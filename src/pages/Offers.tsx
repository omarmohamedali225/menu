import AddOffer from "@/components/dashboard/AddOffer";
import OffersItems from "@/components/dashboard/OffersItems";

export default function Offers() {
  return (
    <>
      <div className="p-4 space-y-3">
        <h1>إدارة العروض</h1>
        <h3 className="text-sm text-mute">ضيف او امسح اي عرض لعملاءك</h3>
        <AddOffer />{" "}
      </div>
      <OffersItems />
    </>
  );
}
