import React, { ReactNode } from "react";
import classNames from "classnames";
import "./FlexItem.scss";

export enum EnumFlexItemMargin {
  None = "none",
  Bottom = "bottom",
  Top = "top",
  Both = "both",
}

export enum EnumFlexItemContentDirection {
  Row = "row",
  Column = "column",
}

export enum EnumFlexItemContentAlign {
  Center = "center",
  Start = "flex-start",
  End = "flex-end",
}

export type Props = {
  className?: string;
  margin?: EnumFlexItemMargin;
  children?: ReactNode;
  start?: ReactNode;
  end?: ReactNode;
  contentDirection?: EnumFlexItemContentDirection;
  contentAlign?: EnumFlexItemContentAlign;
};

const CLASS_NAME = "amp-flex-item";

export const FlexItem = ({
  children,
  className,
  start,
  end,
  margin = EnumFlexItemMargin.None,
  contentDirection = EnumFlexItemContentDirection.Row,
  contentAlign = EnumFlexItemContentAlign.Start,
}: Props) => {
  const marginClass = getMarginStyle(margin);
  const directionClass = `${CLASS_NAME}--${contentDirection}`;

  return (
    <div
      className={classNames(CLASS_NAME, directionClass, marginClass, className)}
      style={{ justifyContent: contentAlign }}
    >
      {start && <FlexStart>{start}</FlexStart>}
      {children}
      {end && <FlexEnd>{end}</FlexEnd>}
    </div>
  );
};

export type FlexStartProps = {
  className?: string;
  children?: ReactNode;
  alignSelf?: EnumFlexItemContentAlign;
};

export const FlexStart = ({
  children,
  className,
  alignSelf,
}: FlexStartProps) => {
  return (
    <div
      style={{ alignSelf: alignSelf }}
      className={classNames(`${CLASS_NAME}__start`, className)}
    >
      {children}
    </div>
  );
};

export type FlexEndProps = {
  className?: string;
  children?: ReactNode;
  alignSelf?: EnumFlexItemContentAlign;
};

export const FlexEnd = ({ children, className, alignSelf }: FlexEndProps) => {
  return (
    <div
      style={{ alignSelf: alignSelf }}
      className={classNames(`${CLASS_NAME}__end`, className)}
    >
      {children}
    </div>
  );
};

function getMarginStyle(margin: EnumFlexItemMargin) {
  return margin ? `${CLASS_NAME}--margin-${margin}` : undefined;
}

FlexItem.FlexStart = FlexStart;
FlexItem.FlexEnd = FlexEnd;