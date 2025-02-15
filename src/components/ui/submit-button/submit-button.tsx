import { useFormStatus } from "react-dom";

// Components
import { Button } from "@/components/ui/button";

// Icons
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  text?: string;
  className?: string;
  disabled?: boolean;
}

const SubmitButton = ({
  text = "Submit",
  className,
  disabled,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending || disabled}
      className={cn(className)}
    >
      {pending && (
        <LoaderCircle size="14" className="animate-spin" color="white" />
      )}
      {pending ? "Cargando..." : text}
    </Button>
  );
};

export { SubmitButton };
