import Button from "@/components/Button";
import { Bell } from "lucide-react";
import { useState } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "@/firebase";

export default function Notifications() {
  const [show, setShow] = useState(true);

  const [msg, setMsg] = useState<null | string>(null);

  // useEffect(() => {
  //   if (!("Notification" in window)) {
  //     setMsg("Your browser doesn't support notifications.");
  //     return;
  //   }
  //   Notification.requestPermission().then((permission) => {
  //     if (permission === "granted") {
  //       setShow(false);
  //       setMsg(null);
  //     }
  //     if (permission === "denied") {
  //       setShow(false);
  //       setMsg(
  //         "Notifications are turned off. Enable them to receive the latest updates, new items, and exclusive offers.",
  //       );
  //     } else if (permission === "default") {
  //       setShow(true);
  //     }
  //   });
  // }, []);

  async function handlePermission() {
    setMsg('جاري التفعيل')
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      // setShow(false);
      setMsg(
        "Notifications are turned off. Enable them from your browser settings.",
      );
      return;
    }
    setMsg('wait...')

    try {
      setMsg('جاري تسجيلك')
      const registration = await navigator.serviceWorker.ready;
      

      const token = await getToken(messaging, {
        vapidKey:
          "BP1mXtt0FjQAhyefgT3i1aoHWQHcOv49vdBgIJzbwQzEBENBpWZKmJs22sgNq57LlhwxinoTHY2F9X-CVzFaNHo",
        serviceWorkerRegistration: registration,
      });

      setMsg(token)
      // console.log("FCM Token:", token);

      // setShow(false);
    } catch (error) {
      // console.error("FCM Error:", { code: error?.code, e: error?.message });
    }
  }

  if (msg) return <Msg title={msg} />;

  if (!show) return null;

  return (
    <div className="flex items-center mx-auto px-4 py-2 bg-red-700 text-amber-100 rounded-2xl">
      <Bell size={18} />
      <span className="flex-1 ml-2 font-medium text-[13px]">
        Get notified about new items and offers!
      </span>
      <Button text="Subscribe" onClick={handlePermission} />
    </div>
  );
}

function Msg({ title }: { title: string }) {
  return (
    <>
      <div className="max-w-2xl mx-auto pt-3 px-4">
        <div className="flex items-center mx-auto px-4 py-2 bg-amber-700 text-amber-100 rounded-2xl">
          <Bell size={18} />
          <span className="flex-1 ml-2 font-medium text-[13px]">{title}</span>
        </div>
      </div>
    </>
  );
}
