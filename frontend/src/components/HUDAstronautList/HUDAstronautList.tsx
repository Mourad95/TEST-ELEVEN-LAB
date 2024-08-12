// React
import { CSSProperties } from "react";

// Libs
import classnames from "classnames";

// Components
import { HUDWindow } from "../HUDWindow";
import { HUDListItem } from "../HUDListItem";
import { Flexbox } from "../Flexbox";

// SVG
import IconSquareEdit from "../../assets/icon-square-edit.svg?react";
import IconTrashAlt from "../../assets/icon-trash-alt.svg?react";

// Styles
import styles from "./HUDAstronautList.module.css";

export type AstronautForList = {
  id: number;
  firstname: string;
  lastname: string;
  planetOfOrigin: string;
};

type AstronautListProps = {
  astronautList?: AstronautForList[];
  className?: string;
  emptyAstronautListMessage: string;
  label?: string;
  onDelete: (astronaut: AstronautForList) => void;
  onEdit: (astronaut: AstronautForList) => void;
  style?: CSSProperties;
};

export function HUDAstronautList({
  astronautList = [],
  className,
  emptyAstronautListMessage,
  label,
  onDelete,
  onEdit,
  style,
}: AstronautListProps) {
  const componentClassNames = classnames(styles.astronautlist, className);

  // Empty astronaut list
  if (!Boolean(astronautList.length)) {
    return (
      <div className={componentClassNames} style={style}>
        {label && <label className={styles.astronautlistLabel}>{label}</label>}
        <HUDWindow className={styles.astronautlistEmptyState}>
          {emptyAstronautListMessage}
        </HUDWindow>
      </div>
    );
  }

  return (
    <div className={componentClassNames} style={style}>
      {label && <label className={styles.astronautlistLabel}>{label}</label>}
      <HUDWindow className={styles.astronautlistWindow}>
        <HUDListItem hasBorder>
          <Flexbox
            justifyContent="space-between"
            className={styles.astronautlistHeader}
          >
            <div>Name</div>
            <div>Planet</div>
            <div>Actions</div>
          </Flexbox>
        </HUDListItem>
        {astronautList.map(
          ({ id, firstname, lastname, planetOfOrigin }, astronautListIndex) => {
            const isLastElement =
              astronautListIndex + 1 === astronautList.length;
            const handleAstronautEdit = () =>
              onEdit({ id, firstname, lastname, planetOfOrigin });
            const handleAstronautDelete = () =>
              onDelete({ id, firstname, lastname, planetOfOrigin });

            return (
              <HUDListItem
                hasBorder={!isLastElement}
              >
                <Flexbox
                  justifyContent="space-between"
                  className={styles.astronautlistContent}
                >
                  <div>
                    {firstname} {lastname}
                  </div>
                  <div>{planetOfOrigin}</div>
                  <div className={styles.astronautlistActions}>
                    <IconSquareEdit onClick={handleAstronautEdit} />
                    <IconTrashAlt onClick={handleAstronautDelete} />
                  </div>
                </Flexbox>
              </HUDListItem>
            );
          },
        )}
      </HUDWindow>
    </div>
  );
}
