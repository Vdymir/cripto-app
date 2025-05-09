import { COLORS } from "@/src/theme/colors";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Typography } from "../typography";

interface TabProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

export default function Tab({ label, active, onPress }: TabProps) {
  const style = active ? styles.active : {};
  const color = active ? COLORS.text : COLORS.text_secondary;
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Typography fontSize={16} fontWeight="bold" color={color}>
        {label}
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  active: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
