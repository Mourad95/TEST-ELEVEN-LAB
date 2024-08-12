// React
import { CSSProperties } from "react";

// Components
import { HUDWindow } from "../HUDWindow";

// Styles
import styles from "./HUDWindowError.module.css";

type HUDWindowErrorProps = {
  className?: string;
  error: string;
  label?: string;
  style?: CSSProperties;
};

export function HUDWindowError({
  className,
  error,
  label,
  style,
}: HUDWindowErrorProps) {
  return (
    <div className={className} style={style}>
      {label && <label className={styles.hudwindowerrorLabel}>{label}</label>}
      <HUDWindow className={styles.hudwindowerrorWindow}>
        <div>{error}</div>
      </HUDWindow>
    </div>
  );
}
