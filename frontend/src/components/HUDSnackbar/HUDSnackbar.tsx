// React
import { ReactNode, MouseEventHandler, CSSProperties } from "react";

// Libs
import classnames from "classnames";

// Components
import { HUDWindow } from "../HUDWindow";
import { Flexbox } from "../Flexbox";

// SVG
import IconInfoCircle from "../../assets/icon-info-circle.svg?react";
import IconCross from "../../assets/icon-cross.svg?react";
import IconCrossCircle from "../../assets/icon-cross-circle.svg?react";

// Style
import styles from "./HUDSnackbar.module.css";

export type HUDSnackbarTypeEnum = "info" | "error";

type HUDSnackbarProps = {
  children?: ReactNode;
  className?: string;
  isActive?: boolean;
  onClose?: MouseEventHandler;
  style?: CSSProperties;
  type?: HUDSnackbarTypeEnum;
};

export function HUDSnackbar({
  children,
  className,
  isActive = false,
  onClose,
  style,
  type = "info",
}: HUDSnackbarProps) {
  const componentClassNames = classnames(styles.hudsnackbar, className, {
    [styles.hudsnackbarIsActive]: isActive,
    [styles.hudsnackbarErrorWindow]: type === "error",
  });
  const progressbarClassNames = classnames(styles.hudsnackbarProgressBar, {
    [styles.hudsnackbarProgressBarInProgress]: isActive,
    [styles.hudsnackbarProgressBarError]: type === "error",
  });
  const closeIconClassNames = classnames(styles.hudsnackbarCloseIcon, {
    [styles.hudsnackbarCloseIconError]: type === "error",
  });

  return (
    <HUDWindow className={componentClassNames} style={style}>
      <Flexbox
        alignItems="center"
        justifyContent="center"
        className={styles.hudsnackbarContent}
      >
        {type === "info" ? (
          <IconInfoCircle className={styles.hudsnackbarStatusIcon} />
        ) : (
          <IconCrossCircle className={styles.hudsnackbarStatusError} />
        )}
        <Flexbox flexDirection="column">
          {type === "info" ? <div>Info</div> : <div>Error</div>}
          <div>{children}</div>
        </Flexbox>
      </Flexbox>
      {onClose && <IconCross className={closeIconClassNames} />}
      <div className={progressbarClassNames} />
    </HUDWindow>
  );
}
