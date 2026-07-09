import Button from "@/components/Button";
import { useEffect, useState } from "react";

export default function InstallApp() {
  const [installEvent, setInstallEvent] = useState<any>(null);
  useEffect(() => {
    const handle = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e);
    };
    window.addEventListener("beforeinstallprompt", handle);
    return () => {
      window.addEventListener("beforeinstallprompt", handle);
    };
  }, []);

  function handleInstall() {
    if (!installEvent) return;
    installEvent.prompt();
    setInstallEvent(null);
  }

  if (!installEvent) return null;

  return (
    <div className="max-w-2xl mx-auto pt-3 px-4">
      <div className="flex items-center mx-auto px-4 py-2 bg-emerald-600 text-amber-100 rounded-md">
        <span className="flex-1 ml-2 font-medium text-[13px]">
          Install the app for a faster, better experience. 🚀
        </span>
        <Button text="Install App" onClick={handleInstall} />
      </div>
    </div>
  );
}
