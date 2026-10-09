import { useEffect } from "react";

type BackType = {
  addEventModal: () => void;
};

export default function useBack(open: boolean, onClose: () => void):BackType {
  useEffect(() => {
    if (!open) return;
    const handlePopState = () => {
      onClose();
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      if (window.history.state.modal) {
        window.history.back();
      }
    };
  }, [open, onClose]);
  function addEventModal() {
    window.history.pushState({ modal: true }, "");
  }
  return { addEventModal };
}
