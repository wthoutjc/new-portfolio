import { StateCreator } from "zustand";

// Interfaces
import { AlertDialog, Notification } from "@/lib/interfaces/ui";
import { User } from "../interfaces/auth";

export const initialDialog: AlertDialog = {
  title: "",
  description: "",
  open: false,
};

const initialUser: User = {
  id: "",
  email: "",
};

interface UISlice {
  alertDialog: AlertDialog;
  user: User;
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  setUser: (user: User) => void;
}

const createUISlice: StateCreator<UISlice> = (set) => ({
  alertDialog: initialDialog,
  user: initialUser,
  notifications: [],
  setNotifications: (notifications: Notification[]) => {
    set(() => {
      return {
        notifications,
      };
    });
  },
  setUser: (user: User) => {
    set(() => {
      return {
        user,
      };
    });
  },
});

export default createUISlice;
export type { UISlice };
