import CartHeader from "@/components/dashboard/CartHeader";
import {
  BadgePercent,
  Copy,
  CopyCheck,
  Layers,
  Package,
  PlusCircle,
} from "lucide-react";

import {
  useCategories,
  useExtras,
  useMenu,
  useOffer,
  useProfile,
  useUpdateProfile,
} from "@/features/dashboard/hooks";
import { useMemo, useState } from "react";
import { Button, Form, Input, message } from "antd";

export default function Dashboard() {
  const { data: menu, isLoading: productsLoad } = useMenu();
  const { data: categories, isLoading: categoriesLoad } = useCategories();
  const { data: offers, isLoading: offersLoad } = useOffer();
  const { data: extras, isLoading: extrasLoad } = useExtras();

  const dataHeader = useMemo(() => {
    return [
      {
        id: 1,
        title: "أجمالي المنتجات",
        count: menu?.length ?? 0,
        url: "products",
        icon: (
          <div className="bg-green-500/40 w-8 h-8 mr-auto flex items-center justify-center rounded-full">
            <Package size={18} className="text-green-900" />
          </div>
        ),
        loading: productsLoad,
      },
      {
        id: 2,
        title: "المنتجات النشطة",
        count: menu?.filter((m) => m.is_available).length ?? 0,
        url: "products",
        icon: (
          <div className="bg-green-500/40 w-8 h-8 mr-auto flex items-center justify-center rounded-full">
            <Package size={18} className="text-green-900" />
          </div>
        ),
        loading: productsLoad,
      },
      {
        id: 3,
        title: "أجمالي التصنيفات",
        count: categories?.length ?? 0,
        url: "categories",
        icon: (
          <div className="bg-yellow-500/40 w-8 h-8 mr-auto flex items-center justify-center rounded-full">
            <Layers size={18} className="text-yellow-900" />
          </div>
        ),
        loading: categoriesLoad,
      },
      {
        id: 4,
        title: "التصنيفات النشطة",
        count: categories?.filter((c) => c.is_available).length ?? 0,
        url: "categories",
        icon: (
          <div className="bg-yellow-500/40 w-8 h-8 mr-auto flex items-center justify-center rounded-full">
            <Layers size={18} className="text-yellow-900" />
          </div>
        ),
        loading: categoriesLoad,
      },
      {
        id: 5,
        title: "العروض",
        count: offers?.length ?? 0,
        url: "offers",
        icon: (
          <div className="bg-fuchsia-500/40 w-8 h-8 mr-auto flex items-center justify-center rounded-full">
            <BadgePercent size={18} className="text-fuchsia-900 rotate-90" />
          </div>
        ),
        loading: offersLoad,
      },
      {
        id: 6,
        title: "العروض النشطة",
        count: offers?.filter((o) => o.is_available).length ?? 0,
        url: "offers",
        icon: (
          <div className="bg-fuchsia-500/40 w-8 h-8 mr-auto flex items-center justify-center rounded-full">
            <BadgePercent size={18} className="text-fuchsia-900 rotate-90" />
          </div>
        ),
        loading: offersLoad,
      },
      {
        id: 7,
        title: "الاضافات",
        count: extras?.length ?? 0,
        url: "extras",
        icon: (
          <div className="bg-blue-500/40 w-8 h-8 mr-auto flex items-center justify-center rounded-full">
            <PlusCircle size={18} className="text-blue-900 rotate-90" />
          </div>
        ),
        loading: extrasLoad,
      },
      {
        id: 8,
        title: "الاضافات النشطة",
        count: extras?.filter((e) => e.is_available).length ?? 0,
        url: "extras",
        icon: (
          <div className="bg-blue-500/40 w-8 h-8 mr-auto flex items-center justify-center rounded-full">
            <PlusCircle size={18} className="text-blue-900 rotate-90" />
          </div>
        ),
        loading: extrasLoad,
      },
    ];
  }, [
    menu,
    categories,
    offers,
    extras,
    productsLoad,
    categoriesLoad,
    offersLoad,
    extrasLoad,
  ]);

  const { data: profile, isLoading: loadProfile } = useProfile();
  const { mutate: updateProfile, isPending: loadUpdateProfile } =
    useUpdateProfile();
  const [copy, setCopy] = useState(false);

  const isActive = profile?.name !== null && profile?.phone !== null;

  if (!isActive) {
    return (
      <div className="flex p-5! flex-col bg-white hover:-translate-y-1 transition-transform rounded-lg shadow border border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-[12px] text-mute">كمل خطوات تفعيل المنيو</h1>
            <h2 className="text-2xl font-bold text-primary"></h2>
            <Form
              layout="vertical"
              className="mt-4!"
              initialValues={{
                name: profile.name ?? "",
                phone: profile.phone ?? "",
              }}
              onFinish={(val) => {
                updateProfile({ name: val.name, phone: val.phone });
              }}
            >
              <Form.Item
                label={"اسم المنيو"}
                name={"name"}
                rules={[{ required: true, message: "مطلوب" }]}
                extra="ده هيظهر للمستخدم كعنوان خاص بيك"
              >
                <Input placeholder="المستعار" />
              </Form.Item>
              <Form.Item
                label={"رقم الهاتف"}
                name="phone"
                rules={[{ required: true, message: "مطلوب" }]}
                extra="رقم الهاتف بنستخدمه عشان نحول العملاء للواتس اب الخاص بيك"
              >
                <Input placeholder="01*" />
              </Form.Item>
              <Button htmlType="submit" disabled={loadUpdateProfile}>
                تفعيل
                {loadUpdateProfile && (
                  <span className="w-4 h-4 border-2 border-l-transparent block rounded-full animate-spin"></span>
                )}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-10">
      <div className="flex items-center justify-between mt-4">
        <div>
          <h1 className="text-xl font-semibold text-primary">
            اهلا بيك, {loadProfile ? "loading..." : profile?.name}
          </h1>
          <h2 className="text-xs mt-1 text-mute">
            دي نظره سريعه علي نشاط متجرك واداره المنيو الخاص بيك 🤗.
          </h2>
        </div>
      </div>
      {/* تفعيل */}

      {/* shorts */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 z-10">
        {dataHeader.map((d) => (
          <CartHeader key={d.id} data={d} />
        ))}
      </div>

      <div
        className="bg-white rounded-lg shadow-2xl p-4 cursor-copy"
        onClick={() => {
          setCopy(true);
          navigator.clipboard.writeText(
            window.location.origin + "/" + profile?.id,
          );
          message.success("تم نسخ رابط المنيو");
        }}
      >
        <h1 className="text-lg flex items-center justify-between">
          رابط المنيو جاهز {!copy ? <Copy /> : <CopyCheck />}
        </h1>
        <h2 className="text-[11px]">اضغط اي مكان للنسخ</h2>
        <p className="text-[11px] mt-2">
          {window.location.origin}/{profile?.id}
        </p>
      </div>
    </div>
  );
}
