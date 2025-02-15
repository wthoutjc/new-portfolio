"use client";
import { PermissionStates } from "../enums/permissions.enum";

// Icons
import { Plus, Info, Trash, Pencil } from "lucide-react";

export const ICONS = {
  [`${PermissionStates.READ}`]: <Info size={16} />,
  [`${PermissionStates.UPDATE}`]: <Pencil size={16} />,
  [`${PermissionStates.DELETE}`]: <Trash size={16} />,
  [`${PermissionStates.CREATE}`]: <Plus size={16} />,
};

export const LABEL_ICONS = {
  [`${PermissionStates.READ}`]: "Ver",
  [`${PermissionStates.UPDATE}`]: "Editar",
  [`${PermissionStates.DELETE}`]: "Eliminar",
  [`${PermissionStates.CREATE}`]: "Crear",
};
