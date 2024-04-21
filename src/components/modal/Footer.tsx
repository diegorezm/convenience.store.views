import { cn } from "@/lib/utils"
import LoadingButton from "../loadingButton"
import { Button } from "../ui/button"
import { DialogFooter, DialogTrigger } from "../ui/dialog"

interface EditFooterProps<T extends (...args: any[]) => any> extends React.HTMLAttributes<HTMLDivElement> {
  loadingText?: string
  type?: "button" | "submit" | undefined
  isLoading: boolean
  handler?: T
}

export default function Footer<T extends (...args: any[]) => any>({ isLoading, handler, loadingText = "Loading...", className = "", type = "button", ...rest }: EditFooterProps<T>) {
  return (
    <DialogFooter className={cn("", className)} {...rest}>
      <DialogTrigger>
        <Button variant={"outline"}>
          Close
        </Button>
      </DialogTrigger>
      <LoadingButton loadingText={loadingText} isLoading={isLoading} type={type} onClick={handler} />
    </DialogFooter>
  )
}
