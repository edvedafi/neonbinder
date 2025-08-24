import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"

export interface InputWithButtonProps {
  label?: string
  placeholder?: string
  buttonText?: string
  helperText?: string
  value?: string
  onValueChange?: (value: string) => void
  onButtonClick?: () => void
  className?: string
  disabled?: boolean
  loading?: boolean
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

const InputWithButton = React.forwardRef<HTMLInputElement, InputWithButtonProps>(
  ({ 
    label, 
    placeholder, 
    buttonText = "Subscribe", 
    helperText, 
    value, 
    onValueChange, 
    onButtonClick,
    className,
    disabled,
    loading,
    buttonVariant = "default",
    ...props 
  }, ref) => {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {label && (
          <Label htmlFor="input-with-button">
            {label}
          </Label>
        )}
        <div className="flex gap-2">
          <Input
            id="input-with-button"
            ref={ref}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onValueChange?.(e.target.value)}
            disabled={disabled || loading}
            className="flex-1"
            {...props}
          />
          <Button
            variant={buttonVariant}
            onClick={onButtonClick}
            disabled={disabled}
            loading={loading}
            className="px-4 whitespace-nowrap"
          >
            {buttonText}
          </Button>
        </div>
        {helperText && (
          <p className="text-sm text-slate-500 font-lexend">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
InputWithButton.displayName = "InputWithButton"

export { InputWithButton }
