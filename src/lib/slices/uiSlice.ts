import { StateCreator } from "zustand";

// Interfaces
import { AlertDialog, Notification } from "@/lib/interfaces/ui";

export const initialDialog: AlertDialog = {
  title: "",
  description: "",
  open: false,
};

interface UISlice {
  alertDialog: AlertDialog;
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
}

const createUISlice: StateCreator<UISlice> = (set) => ({
  alertDialog: initialDialog,
  notifications: [],
  setNotifications: (notifications: Notification[]) => {
    set(() => {
      return {
        notifications,
      };
    });
  },
});

export default createUISlice;
export type { UISlice };
