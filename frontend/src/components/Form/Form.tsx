// React
import { FormHTMLAttributes } from "react";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {}

export function Form({
  children,
  className,
  noValidate,
  onSubmit,
  style,
}: FormProps) {
  return (
    <form
      className={className}
      onSubmit={onSubmit}
      style={style}
      noValidate={noValidate}
    >
      {children}
    </form>
  );
}
