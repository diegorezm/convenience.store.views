import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type EditHeaderProps = {
  title: string
  description?: string
}

export default function EditHeader({ title, description }: EditHeaderProps) {
  return (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      {description && (
        <DialogDescription>
          {description}
        </DialogDescription>
      )}
    </DialogHeader>
  )
}
