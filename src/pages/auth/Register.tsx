import { sendTelegram } from "@/helpers/telegram";
import { supabase } from "@/lib/supabase";
import { Form, Input } from "antd";
import { useState } from "react";
import { Link } from "react-router";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setLoading(true);
    // const { error } = await supabase.auth.signInWithOtp({
    //   email,
    //   options: {
    //     emailRedirectTo: window.location.origin + "/dashboard",
    //   },
    // });
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(true);
      throw error;
    }
    setSuccess(true);

    const time = new Date().toLocaleString("ar-EG", {
      timeZone: "Africa/Cairo",
      dateStyle: "short",
      timeStyle: "short",
    });

    sendTelegram(`🍽 منيو جديد اتعمل في السيستم
الوقت: ${time}
الحالة: غير مفعّل ⛔`);
  }

  return (
    <div className="w-full h-screen flex items-center justify-center from-[#AB081D] to-primary text-white bg-linear-to-r">
      <div className="w-full max-w-md p-5">
        <h1 className="text-center">تسجيل منيو جديد</h1>
        <p className="text-center mb-5 text-[11px]">ادارة منيو تسهل عليك</p>
        {!success && (
          <Form
            layout="vertical"
            initialValues={{ email: "" }}
            onFinish={handleSubmit}
          >
            <Form.Item
              name={"email"}
              rules={[
                { required: true, message: "الايميل مطلوب" },
                { type: "email", message: "الايميل غير صالح" },
              ]}
              label={"البريد الالكتروني"}
              className="[&_label]:text-white!"
            >
              <Input placeholder="omar@gmail.com" />
            </Form.Item>
            <Form.Item
              name={"password"}
              rules={[
                { required: true, message: "كلمة السر مطلوبة" },
                { min: 6, message: "لازم مش اقل من 6 حروف" },
              ]}
              label={"كلمة السر"}
              className="[&_label]:text-white!"
            >
              <Input placeholder="*******" />
            </Form.Item>
            <button
              disabled={loading}
              className="bg-[#AB081D] text-white bg-linear-to-r px-2 py-1 rounded outline-0 hover:bg-red-500 flex items-center gap-1 transition-colors m-w-20"
            >
              تسجيل مستخدم جديد
              {loading && (
                <span className="w-4 h-4 border-2 border-l-transparent block rounded-full animate-spin"></span>
              )}
            </button>
          </Form>
        )}
        <p className="text-center text-[11px]">
          <Link to={"/"}>هل لديك منيو؟ سجل الان </Link>
        </p>
        {success && (
          <p className="text-center text-[11px]">
            بعتنالك رسالة فيها معرف التسجيل اتحقق منها وهتتحول تلقائي للمنيو
            الخاص بك
          </p>
        )}
        {error && (
          <p className="text-center text-[11px]">
            حدث خطا في التسجيل اعد المحاولة مجددا
          </p>
        )}
      </div>
    </div>
  );
}
