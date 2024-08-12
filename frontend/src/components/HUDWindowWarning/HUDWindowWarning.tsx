// React
import { CSSProperties } from "react";

// Components
import { HUDWindow } from "../HUDWindow";

// Styles
import styles from "./HUDWindowWarning.module.css";

type HUDWindowWarningProps = {
  className?: string;
  label?: string;
  style?: CSSProperties;
  warning: string;
};

export function HUDWindowWarning({
  className,
  label,
  style,
  warning,
}: HUDWindowWarningProps) {
  return (
    <div className={className} style={style}>
      {label && <label className={styles.hudwindowwarningLabel}>{label}</label>}
      <HUDWindow className={styles.hudwindowwarningWindow}>
        <div>{warning}</div>
      </HUDWindow>
    </div>
  );
}
