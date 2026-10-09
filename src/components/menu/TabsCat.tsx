import { useCategories } from "@/features/menu/hooks";
// import type { CategoriesType } from "@/types/Products";
import { Tabs } from "antd";
import { useEffect, useRef, useState } from "react";

export default function TabsCat() {
  const [activeId, setActiveId] = useState<null | string>(null);
  const visibleSet = useRef(new Set<Element>());
  const isClickScrolling = useRef(false);

  const { data: categories } = useCategories();


  useEffect(() => {
    const interSection = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visibleSet.current.add(e.target);
          else visibleSet.current.delete(e.target);
        });
        const visible = Array.from(visibleSet.current).sort(
          (a, b) =>
            a.getBoundingClientRect().top - b.getBoundingClientRect().top,
        );
        const target = visible[visible.length - 1];

        if (target) {
          const id = target.getAttribute("data-category");
          if (id && !isClickScrolling.current) {
            setActiveId(id);
          }
        }
      },
      {
        threshold: 0,
      },
    );
    document.querySelectorAll("[data-category]").forEach((e) => {
      interSection.observe(e);
    });

    return () => {
      interSection.disconnect();
    };
  }, []);

  //عشان لما يضغط هو ويعمل سكرول ميحسبش كله يستني لغايه م يوقف يعمنا
  useEffect(() => {
    const onScrollEnd = () => (isClickScrolling.current = false);
    window.addEventListener("scrollend", onScrollEnd);
    return () => window.removeEventListener("scrollend", onScrollEnd);
  }, []);

  // handleTabs
  const dataTabs = categories?.map((cat) => {
    return {
      key: cat.slug ?? String(cat.id),
      label: cat.name_ar,
    };
  });

  function HandleTapClick(key: string) {
    setActiveId(key);
    isClickScrolling.current = true;
    document
      .querySelector(`[data-category="${key}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-main sticky top-20 z-50">
      {dataTabs && (
        <Tabs
          activeKey={activeId ? activeId : dataTabs[0]?.key}
          onTabClick={HandleTapClick}
          items={dataTabs}
          direction="rtl"
          classNames={{
            item: "[&.ant-tabs-tab-active_.ant-tabs-tab-btn]:bg-amber-700! [&.ant-tabs-tab-active_.ant-tabs-tab-btn]:text-main! [&_.ant-tabs-tab-btn]:p-2 [&_.ant-tabs-tab-btn]:rounded-xl",
          }}
        />
      )}
    </div>
  );
}
