"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { INITIAL_DIALOG } from "@/lib/slices/uiSlice";

// Zustand
import { useUIStore } from "@/zustand/store";

const AlertDialog = () => {
  const { alertDialog, setAlertDialog } = useUIStore();
  const { description, title, children, open, callback } = alertDialog;

  const handleClose = () => {
    setAlertDialog(INITIAL_DIALOG);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="whitespace-pre-line text-left">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children && <div className="grid gap-4 py-4">{children}</div>}
        <DialogFooter>
          {callback ? (
            <Button onClick={callback}>Aceptar</Button>
          ) : (
            <Button onClick={handleClose}>Aceptar</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { AlertDialog };
