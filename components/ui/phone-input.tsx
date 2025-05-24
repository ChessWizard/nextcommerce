"use client";

import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import { forwardRef, useState, useEffect } from "react";
import * as React from "react";

export interface PhoneInputProps extends Omit<React.ComponentProps<"input">, "onChange"> {
  onChange?: (value: string) => void;
  value?: string;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, value: externalValue, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState<string>("");

    const formatPhoneNumber = (inputValue: string) => {
      const digits = inputValue.replace(/\D/g, "");
      
      if (digits.length === 0) return "";
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    };

    useEffect(() => {
      if (externalValue !== undefined) {
        setDisplayValue(formatPhoneNumber(externalValue));
      }
    }, [externalValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      
      const formattedValue = formatPhoneNumber(inputValue);
      setDisplayValue(formattedValue);
      
      if (onChange) {
        const digitsOnly = inputValue.replace(/\D/g, "");
        onChange(digitsOnly);
      }
    };

    return (
      <div className="relative">
        <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input
          ref={ref}
          type="tel"
          placeholder="(555) 123-4567"
          className={`pl-10 ${className || ""}`}
          value={displayValue}
          onChange={handleChange}
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput }; 