import LoadingButton from "../loadingButton"
import { Button } from "../ui/button"
import { DialogFooter, DialogTrigger } from "../ui/dialog"

type EditFooterProps = {
  isLoading: boolean
  handler: Function
}

export default function EditFooter({ isLoading, handler}: EditFooterProps) {
  return (
    <DialogFooter>
      <DialogTrigger>
        <Button variant={"outline"}>
          Close
        </Button>
      </DialogTrigger>
      <LoadingButton loadingText="Deleting..." isLoading={isLoading} type="button" onClick={() => handler} />
    </DialogFooter>
  )
}
