import { RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { MouseEventHandler } from "react";

type LoadingButtonProps<T extends MouseEventHandler<HTMLButtonElement>> = {
  text?: string;
  loadingText?: string;
  type?: "submit" | "button";
  onClick?: T;
  isLoading: boolean;
};

export default function LoadingButton<T extends MouseEventHandler<HTMLButtonElement>>({
  text = "Ok",
  type = "submit",
  loadingText = "Please wait...",
  onClick,
  isLoading
}: LoadingButtonProps<T>) {
  if (isLoading) {
    return (
      <Button disabled>
        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
        {loadingText}
      </Button>
    );
  }
  if (onClick) {
    return (
      <Button type={type} onClick={onClick}>
        {text}
      </Button>
    );
  }
  return <Button type={type}>{text}</Button>;
}
