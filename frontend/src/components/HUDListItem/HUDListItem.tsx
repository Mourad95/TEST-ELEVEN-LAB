// React
import { ReactNode, MouseEventHandler, CSSProperties } from "react";

// Libs
import classnames from "classnames";

// Styles
import styles from "./HUDListItem.module.css";

type HUDListItemProps = {
  children: ReactNode;
  className?: string;
  hasBorder?: boolean;
  isActive?: boolean;
  onClick?: MouseEventHandler;
  style?: CSSProperties;
};

export function HUDListItem({
  children,
  className,
  hasBorder = false,
  isActive = false,
  onClick,
  style,
}: HUDListItemProps) {
  const componentClassNames = classnames(styles.hudlistitem, className, {
    [styles.hudlistitemBordered]: hasBorder,
    [styles.hudlistitemClickable]: onClick != undefined,
    [styles.hudlistitemActive]: isActive,
  });

  return (
    <li className={componentClassNames} style={style} onClick={onClick}>
      {children}
    </li>
  );
}
