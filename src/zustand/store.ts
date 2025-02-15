import { create } from "zustand";
import createUISlice, { UISlice } from "@/lib/slices/uiSlice";

export const useUIStore = create<UISlice>()((...a) => createUISlice(...a));
