export type Severity = "error" | "warning" | "info" | "success";

export interface ThemeConfig {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

export interface AlertDialog {
  title: string;
  description: string;
  open: boolean;
  disabled?: boolean;
  callback?: (params?: unknown) => void;
  children?: React.ReactNode;
}

export interface UIState {
  alertDialog: AlertDialog;
}

export interface TypeIdentificationResponse {
  typesIdentification: TypesIdentification[];
}

export interface TypesIdentification {
  id: string;
  name: string;
}
