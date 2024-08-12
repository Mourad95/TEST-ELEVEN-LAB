// React
import { ReactNode, CSSProperties } from "react";

type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "start"
  | "end"
  | "left"
  | "unsafe";
type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

type FlexboxProps = {
  alignItems?: string;
  children?: ReactNode;
  className?: string;
  flex?: string;
  flexBasis?: string;
  flexDirection?: FlexDirection;
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: FlexWrap;
  justifyContent?: JustifyContent;
  style?: CSSProperties;
};

export function Flexbox({
  alignItems = "stretch",
  children,
  className,
  flex = "0 1 auto",
  flexBasis = "auto",
  flexDirection = "row",
  flexGrow = 0,
  flexShrink = 0,
  flexWrap = "nowrap",
  justifyContent = "flex-start",
  style,
}: FlexboxProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        justifyContent: justifyContent,
        flexDirection: flexDirection,
        flexGrow: flexGrow,
        flexBasis: flexBasis,
        flexShrink: flexShrink,
        flexWrap: flexWrap,
        flex: flex,
        alignItems: alignItems,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
