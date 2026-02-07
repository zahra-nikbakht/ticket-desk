import clsx from "clsx";
import * as React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className={clsx("space-y-1", className)}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium">
            {label}
          </label>
        )}
        <input id={inputId} ref={ref} className="ui-input" {...props} />
        {error && <div className="text-sm text-red-600">{error}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";