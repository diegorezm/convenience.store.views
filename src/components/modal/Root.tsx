import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import React from "react"

interface RootProps{
  clearParams?: () => void
  children: React.ReactNode
}

export default function Root({ clearParams, children}: RootProps) {
  return (
    <Dialog defaultOpen onOpenChange={clearParams}>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
}
