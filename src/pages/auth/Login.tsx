import { supabase } from "@/lib/supabase";
import { Form, Input } from "antd";
import { useState } from "react";
import { Link } from "react-router";
export default function Login() {
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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(true);
      throw error;
    }
    setSuccess(true);
  }
  return (
    <div className="w-full h-screen flex items-center justify-center from-[#AB081D] to-primary text-white bg-linear-to-r">
      <div className="w-full max-w-md p-5">
        <h1 className="text-center">اهلا بيك في المنصة</h1>
        <p className="text-center mb-5 text-[11px]">ادارة منيو تسهل عليك</p>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name={"email"}
            rules={[
              { required: true, message: "الايميل مطلوب" },
              { type: "email", message: "الايميل غير صالح" },
            ]}
            label={"ايميل"}
            className="[&_label]:text-white!"
          >
            <Input placeholder="omar@gmail.com" />
          </Form.Item>
          <Form.Item
            name={"password"}
            rules={[
              { required: true, message: "كلمة السر مطلوبة" },
              { min: 6, message: "كلمة المرور اقل حاجه 6 حروف" },
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
            دخول
            {loading && (
              <span className="w-4 h-4 border-2 border-l-transparent block rounded-full animate-spin"></span>
            )}
          </button>
        </Form>
        <p className="text-center text-[11px]">
          ليس لديك منيو؟ <Link to={"/register"}>سجل الان </Link>
        </p>
        {success && (
          <p className="text-center text-[11px]">
            بعتنالك رسالة فيها معرف التسجيل اتحقق منها وهتتحول تلقائي للمنيو
            الخاص بك
          </p>
        )}
        {error && (
          <p className="text-center text-[11px]">الايميل او كلمة السر غلط</p>
        )}
      </div>
    </div>
  );
}
