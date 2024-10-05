import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  title?: string;
  description?: string;
}
export default function AlertSuccess({ title, description }: Props) {
  return (
    <Alert variant="success">
      <CheckCircledIcon className="h-5 w-5" color="green" />
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
}
