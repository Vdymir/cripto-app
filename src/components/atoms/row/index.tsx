import React from "react";
import { FlexAlignType, View } from "react-native";

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
}

export default function Row({
  children,
  justifyContent = "space-between",
  alignItems = "center",
  gap,
}: RowProps) {
  return (
    <View style={{ flexDirection: "row", justifyContent, alignItems, gap }}>
      {children}
    </View>
  );
}
