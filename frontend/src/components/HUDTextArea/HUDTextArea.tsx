// React
import { forwardRef, TextareaHTMLAttributes } from "react";

// Styles
import styles from "./HUDTextArea.module.css";

// Libs
import classnames from "classnames";

interface HUDTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string | null;
  label: string;
}

export const HUDTextArea = forwardRef<
  HTMLTextAreaElement | null,
  HUDTextAreaProps
>(function HUDTextAreaComponent(
  {
    className,
    cols,
    defaultValue,
    error = null,
    label,
    name,
    onChange,
    placeholder,
    required = false,
    rows,
    style,
    value,
  },
  ref,
) {
  const componentClassNames = classnames(styles.hudtextarea, className);
  const inputClassNames = classnames(styles.hudtextareaHtmlTextarea, {
    [styles.hudtextareaHtmlTextareaError]: error !== null,
  });
  const labelClassNames = classnames(styles.hudtextareaLabel, {
    [styles.hudtextareaLabelError]: error !== null,
  });
  const barClassNames = classnames(styles.hudtextareaBar, {
    [styles.hudtextareaBarError]: error !== null,
  });

  return (
    <div className={componentClassNames}>
      <textarea
        id={name}
        name={name}
        className={inputClassNames}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        value={value}
        rows={rows}
        cols={cols}
        ref={ref}
        style={style}
        defaultValue={defaultValue}
      />
      <label htmlFor={name} className={labelClassNames}>
        {label}
      </label>
      <i className={barClassNames}></i>
      {error && <div className={styles.hudtextareaError}>{error}</div>}
    </div>
  );
});
