"use client"
import { EditDropdown } from "@/components/editDropdown";

export default function Dashboard() {
  return (
    <div>
      <EditDropdown.Root clearParams={() => { }}>
        <EditDropdown.Header title="Testando" />
        <EditDropdown.InputField />
        <EditDropdown.Footer isLoading={false} handler={() => { }} />
      </EditDropdown.Root>
    </div>
  )
}
