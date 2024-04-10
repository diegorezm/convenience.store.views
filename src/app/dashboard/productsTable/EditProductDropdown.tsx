import { EditDropdown } from "@/components/editDropdown"
import { EntityDropdownProps } from "./page"
export default function EditProductDropdown({ clearParams, id }: EntityDropdownProps) {
  const pId = parseInt(id)
  return (
    <>
      <EditDropdown.Root clearParams={clearParams}>
        <EditDropdown.Header title={`Editing ${pId}`} />
        <EditDropdown.InputField />
        <EditDropdown.Footer isLoading={false} handler={() => { }} />
      </EditDropdown.Root>
    </>
  )
}
