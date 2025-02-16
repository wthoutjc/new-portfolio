import { StateCreator } from "zustand";

// Interfaces
import { AlertDialog, Notification } from "@/lib/interfaces/ui";

export const INITIAL_DIALOG: AlertDialog = {
  title: "",
  description: "",
  children: null,
  open: false,
};

interface UISlice {
  alertDialog: AlertDialog;
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  setAlertDialog: (alertDialog: AlertDialog) => void;
}

const createUISlice: StateCreator<UISlice> = (set) => ({
  alertDialog: INITIAL_DIALOG,
  notifications: [],
  setNotifications: (notifications: Notification[]) => {
    set(() => {
      return {
        notifications,
      };
    });
  },
  setAlertDialog: (alertDialog: AlertDialog) => {
    set(() => {
      return { alertDialog };
    });
  },
});

export default createUISlice;
export type { UISlice };
