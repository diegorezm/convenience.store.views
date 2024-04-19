import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface EditHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
}

export default function Header({ title, description, className = "", ...rest }: EditHeaderProps) {
  return (
    <DialogHeader className={cn("", className)} {...rest}>
      <DialogTitle>{title}</DialogTitle>
      {description && (
        <DialogDescription>
          {description}
        </DialogDescription>
      )}
    </DialogHeader>
  )
}
