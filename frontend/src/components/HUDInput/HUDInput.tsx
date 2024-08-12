// React
import { forwardRef, InputHTMLAttributes } from "react";

// Libs
import classnames from "classnames";

// Styles
import styles from "./HUDInput.module.css";

interface HUDInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label: string;
}

export const HUDInput = forwardRef<HTMLInputElement | null, HUDInputProps>(
  function HUDInputComponent(
    {
      className,
      defaultValue,
      error = null,
      label,
      name,
      onChange,
      placeholder,
      required = false,
      style,
      type = "text",
      value,
    },
    ref,
  ) {
    const componentClassNames = classnames(styles.hudinput, className);
    const inputClassNames = classnames(styles.hudinputHtmlInput, {
      [styles.hudinputHtmlInputError]: error !== null,
    });
    const labelClassNames = classnames(styles.hudinputLabel, {
      [styles.hudinputLabelError]: error !== null,
    });
    const barClassNames = classnames(styles.hudinputBar, {
      [styles.hudinputBarError]: error !== null,
    });

    console.log('INPUT STATE RELOAD');

    return (
      <div className={componentClassNames} style={style}>
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          className={inputClassNames}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          ref={ref}
          defaultValue={defaultValue}
        />
        <label htmlFor={name} className={labelClassNames}>
          {label}
        </label>
        <i className={barClassNames}></i>
        {error && <div className={styles.hudinputError}>{error}</div>}
      </div>
    );
  },
);
