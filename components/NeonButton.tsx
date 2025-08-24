import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";

interface NeonButtonProps extends Omit<ButtonProps, 'variant'> {
  cancel?: boolean;
  children: React.ReactNode;
}

export default function NeonButton({
  cancel = false,
  children,
  ...props
}: NeonButtonProps) {
  const variant = cancel ? "destructive" : "default";
  
  return (
    <Button variant={variant} {...props}>
      {children}
    </Button>
  );
}
