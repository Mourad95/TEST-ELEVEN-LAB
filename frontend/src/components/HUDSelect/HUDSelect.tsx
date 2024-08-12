// React
import { forwardRef, SelectHTMLAttributes } from "react";

// Libs
import classnames from "classnames";

// Styles
import styles from "./HUDSelect.module.css";

type HUDSelectOptions = {
  value: string;
  label: string;
};

interface HUDSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string | null;
  label: string;
  options?: HUDSelectOptions[];
}

export const HUDSelect = forwardRef<HTMLSelectElement | null, HUDSelectProps>(
  function HUDSelectComponent(
    {
      className,
      error = null,
      label,
      name,
      onChange,
      options = [],
      required = false,
      style,
      value,
    },
    ref,
  ) {
    const componentClassNames = classnames(styles.hudselect, className, {
      [styles.hudselectError]: error !== null,
    });
    const inputClassNames = classnames(styles.hudselectHtmlSelect, {
      [styles.hudselectHtmlSelectError]: error !== null,
    });
    const labelClassNames = classnames(styles.hudselectLabel, {
      [styles.hudselectLabelError]: error !== null,
    });

    return (
      <>
        <div className={componentClassNames} style={style}>
          <select
            id={name}
            name={name}
            className={inputClassNames}
            defaultValue={value}
            required={required}
            onChange={onChange}
            ref={ref}
          >
            {options.map(({ value: optionValue, label: optionLabel }) => (
              <option value={optionValue}>{optionLabel}</option>
            ))}
          </select>
          <label className={labelClassNames} htmlFor={name}>
            {label}
          </label>
        </div>
        {error && <div className={styles.hudselectError}>{error}</div>}
      </>
    );
  },
);
