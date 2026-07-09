import Button from "@/components/Button";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

export default function Notifications() {
  const [show, setShow] = useState(false);

  const [msg, setMsg] = useState<null | string>(null);

  useEffect(() => {
    if (!("Notification" in window)) {
      setMsg("Your browser doesn't support notifications.");
      return;
    }
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        setShow(false);
        setMsg(null);
      }
      if (permission === "denied") {
        setShow(false);
        setMsg(
          "Notifications are turned off. Enable them to receive the latest updates, new items, and exclusive offers.",
        );
      } else if (permission === "default") {
        setShow(true);
      }
    });
  }, []);

  async function handlePermission() {
    if (Notification.permission !== "default") return;

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      setShow(false);
    } else {
      setShow(false);
      setMsg(
        "Notifications are turned off. Enable them from your browser settings.",
      );
    }
  }

  if (msg) return <Msg title={msg} />;

  if (!show) return null;

  return (
    <div className="max-w-2xl mx-auto pt-3 px-4">
      <div className="flex items-center mx-auto px-4 py-2 bg-red-700 text-amber-100 rounded-2xl">
        <Bell size={18} />
        <span className="flex-1 ml-2 font-medium text-[13px]">
          Get notified about new items and offers!
        </span>
        <Button text="Subscribe" onClick={handlePermission} />
      </div>
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
