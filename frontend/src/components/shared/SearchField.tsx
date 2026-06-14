"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Search, X } from "lucide-react";
import clsx from "clsx";

export interface SearchFieldProps {
  placeholder: string;
  ariaLabel: string;
  className?: string;
  onDebouncedChange?: (value: string) => void;
}

export function SearchField({
  placeholder,
  ariaLabel,
  className,
  onDebouncedChange
}: SearchFieldProps) {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedValue(value);
      onDebouncedChange?.(value);
    }, 220);

    return () => window.clearTimeout(timeout);
  }, [onDebouncedChange, value]);

  const hasValue = value.length > 0;
  const isSettling = value !== debouncedValue;
  const trailingIcon = useMemo(() => {
    if (isSettling && hasValue) {
      return <Loader2 className="h-4 w-4 animate-spin text-primary" aria-hidden="true" />;
    }

    if (hasValue) {
      return (
        <button
          type="button"
          className="focus-ring flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
          onClick={() => setValue("")}
          aria-label="Clear search"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      );
    }

    return null;
  }, [hasValue, isSettling]);

  return (
    <label
      className={clsx(
        "surface-card focus-within:ring-focus-ring/35 flex h-11 items-center gap-3 rounded-md px-4 text-muted-foreground transition-[border-color,box-shadow] duration-200 ease-out focus-within:border-primary/60 focus-within:ring-2",
        className
      )}
    >
      <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
      <input
        className="h-full min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      {trailingIcon}
    </label>
  );
}
