import { COLORS } from "@/src/theme/colors";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../typography";

interface ButtonOutlineProps {
  label: String;
  onPress?: () => {};
}

export default function ButtonOutline({ label, onPress }: ButtonOutlineProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container}>
        <Typography color={COLORS.text} fontSize={18} fontWeight="500">
          {label}
        </Typography>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    minWidth: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
