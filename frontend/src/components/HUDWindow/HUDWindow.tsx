// React
import { ReactNode, CSSProperties } from "react";

// Libs
import classnames from "classnames";

// Styles
import styles from "./HUDWindow.module.css";

type HUDWindowProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function HUDWindow({ children, className, style }: HUDWindowProps) {
  const componentClasses = classnames(styles.hudwindow, className);

  return (
    <div className={componentClasses} style={style}>
      {children}
    </div>
  );
}
