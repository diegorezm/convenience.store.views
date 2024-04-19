import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import { InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string,
  label: string,
  className?: string
}

export default function InputField({ id, label, className = "", ...rest }: InputFieldProps) {
  return (
    <>
      <Label htmlFor={id} className="text-lg">{label}</Label>
      <Input id={id} {...rest}  className={cn("", className)}/>
    </>
  )
}
