import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import React from "react"

type EditRootProps = {
  clearParams: () => void
  children: React.ReactNode
}

export default function EditRoot({ clearParams, children }: EditRootProps) {
  return (
    <Dialog defaultOpen onOpenChange={clearParams}>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
}
