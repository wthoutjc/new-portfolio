export type Severity = "error" | "warning" | "info" | "success";

export interface AlertDialog {
  title: string;
  description: string;
  open: boolean;
  disabled?: boolean;
  callback?: (params?: unknown) => void;
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

export interface Notification {
  id: string;
  title: string;
  description: string;
  severity: Severity;
}
