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
  loading?: boolean;
}

const SubmitButton = ({
  text = "Submit",
  className,
  disabled,
  loading = false,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  const isLoading = pending || loading;

  return (
    <Button
      type="submit"
      disabled={disabled || isLoading}
      className={cn(className)}
    >
      {isLoading && (
        <LoaderCircle size="14" className="animate-spin mr-2" color="white" />
      )}
      {isLoading ? "Loading..." : text}
    </Button>
  );
};

export { SubmitButton };
