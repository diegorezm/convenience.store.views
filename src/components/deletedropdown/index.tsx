import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import LoadingButton from "@/components/loadingButton"

type DeleteDropdownProps<T extends (...args: any[]) => any> = {
  text: string
  open: boolean
  isLoading?: boolean
  openChange: () => void
  handleDelete: T
}

export default function DeleteDropdown<T extends (...args: any[]) => any>(
  { open, openChange, handleDelete, isLoading = false, text }
    : DeleteDropdownProps<T>) {
  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>
            <span className="text-lg">{text}</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogTrigger>
            <Button variant={"outline"}>
              Close
            </Button>
          </DialogTrigger>
          <LoadingButton loadingText="Deleting..." isLoading={isLoading} type="button" onClick={handleDelete} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
