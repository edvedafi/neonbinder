import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Textarea } from "./textarea"
import { Label } from "./label"

export interface TextareaWithButtonProps {
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
  rows?: number
}

const TextareaWithButton = React.forwardRef<HTMLTextAreaElement, TextareaWithButtonProps>(
  ({ 
    label, 
    placeholder = "Type your message here", 
    buttonText = "Send message", 
    helperText, 
    value, 
    onValueChange, 
    onButtonClick,
    className,
    disabled,
    loading,
    buttonVariant = "default",
    rows = 3,
    ...props 
  }, ref) => {
    return (
      <div className={cn("flex flex-col gap-3", className)}>
        {label && (
          <Label htmlFor="textarea-with-button">
            {label}
          </Label>
        )}
        <Textarea
          id="textarea-with-button"
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onValueChange?.(e.target.value)}
          disabled={disabled || loading}
          rows={rows}
          {...props}
        />
        <Button
          variant={buttonVariant}
          onClick={onButtonClick}
          disabled={disabled}
          loading={loading}
          className="w-full"
        >
          {buttonText}
        </Button>
        {helperText && (
          <p className="text-sm text-slate-500 font-lexend">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
TextareaWithButton.displayName = "TextareaWithButton"

export { TextareaWithButton }
