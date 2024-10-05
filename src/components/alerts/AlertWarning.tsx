import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  title?: string;
  description?: string;
  className?: string;
}
export default function AlertWarning({ title, description, className }: Props) {
  return (
    <Alert variant="warning" className={className}>
      <ExclamationTriangleIcon className="h-4 w-4" color="red" />
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
}
