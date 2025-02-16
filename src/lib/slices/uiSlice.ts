import { StateCreator } from "zustand";

// Interfaces
import { AlertDialog } from "@/lib/interfaces/ui";

export const INITIAL_DIALOG: AlertDialog = {
  title: "",
  description: "",
  children: null,
  open: false,
};

interface UISlice {
  alertDialog: AlertDialog;
  setAlertDialog: (alertDialog: AlertDialog) => void;
}

const createUISlice: StateCreator<UISlice> = (set) => ({
  alertDialog: INITIAL_DIALOG,
  setAlertDialog: (alertDialog: AlertDialog) => {
    set(() => {
      return { alertDialog };
    });
  },
});

export default createUISlice;
export type { UISlice };
