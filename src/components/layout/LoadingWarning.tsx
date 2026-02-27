import { LoaderCircle } from "lucide-react";

type LoadingWarningProps = {
  description: string;
};

const LoadingWarning = ({ description }: LoadingWarningProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <LoaderCircle className="animate-spin" />
      <p>{description}</p>
    </div>
  );
};

export default LoadingWarning;
