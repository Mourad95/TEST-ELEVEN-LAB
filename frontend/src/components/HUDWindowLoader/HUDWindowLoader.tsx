// React
import { CSSProperties } from "react";

// Components
import { HUDWindow } from "../HUDWindow";

// Styles
import styles from "./HUDWindowLoader.module.css";

type HUDWindowLoaderProps = {
  className?: string;
  label?: string;
  name: string;
  rows?: number;
  style?: CSSProperties;
};

export function HUDWindowLoader({
  className,
  label,
  name,
  rows = 5,
  style,
}: HUDWindowLoaderProps) {
  return (
    <div className={className} style={style}>
      {label && <label className={styles.hudwindowloaderLabel}>{label}</label>}
      <HUDWindow className={styles.hudwindowloaderWindow}>
        {[...Array(rows)].map((_, index) => (
          <div key={`${index}`} className={styles.hudwindowloaderRow} />
        ))}
      </HUDWindow>
    </div>
  );
}
