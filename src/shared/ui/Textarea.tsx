import clsx from "clsx";
import * as React from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id ?? props.name;

    return (
      <div className={clsx("space-y-1", className)}>
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={clsx("ui-input min-h-[140px]")}
          {...props}
        />
        {error && <div className="text-sm text-red-600">{error}</div>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";