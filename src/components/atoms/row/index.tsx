import React from "react";
import { DimensionValue, FlexAlignType, View } from "react-native";

interface RowProps {
  children: React.ReactNode | React.ReactNode[];
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: FlexAlignType;
  gap?: string | number;
  marginTop?: DimensionValue | undefined;
}

export default function Row({
  children,
  justifyContent = "space-between",
  alignItems = "center",
  gap,
  marginTop,
}: RowProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent,
        alignItems,
        gap,
        marginTop,
      }}
    >
      {children}
    </View>
  );
}
