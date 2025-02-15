import { useFormStatus } from "react-dom";

// Components
import { Button } from "@/components/ui/button";

// Icons
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  text?: string;
  className?: string;
}

const SubmitButton = ({ text = "Submit", className }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={cn(className)}>
      {pending && (
        <LoaderCircle size="14" className="animate-spin" color="white" />
      )}
      {text}
    </Button>
  );
};

export { SubmitButton };
