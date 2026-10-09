// import Notification from "@/components/Notifications";
import Offer from "@/components/menu/Offer";
import SectionCatItems from "@/components/menu/SectionCatItems";
import TabsCat from "@/components/menu/TabsCat";
// import TabsCat from "@/components/TabsCat";
// import InstallApp from "@/components/InstallApp";
export default function Menu() {
  return (
    <>
      {/* <Notification /> */}
      {/* <InstallApp /> */}
      <Offer />
      {/* <SectionCatItems catName={"Most Ordered 🔥"} /> */}
      <TabsCat />
      <SectionCatItems />
      <Loader />
    </>
  );
}

import { useEffect, useState } from "react";

function Loader() {
  const [hide, setHide] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const finish = () => {
      timer = setTimeout(() => setHide(true), 3000);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={`loader ${hide ? "loader--hide" : ""}`}
      onTransitionEnd={() => hide && setRemoved(true)}
    >
      <div className="scene">
        <span className="steam s1" />
        <span className="steam s2" />
        <span className="steam s3" />

        <div className="dome" />
        <div className="food" />
        <div className="plate" />
      </div>

      <p className="loader__text">
        جاري تحضير المنيو
        <span className="dots" />
      </p>
    </div>
  );
}
