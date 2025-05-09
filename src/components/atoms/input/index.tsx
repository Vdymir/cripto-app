import { COLORS } from "@/src/theme/colors";
import { FontFamily } from "@/src/theme/fontFamily";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface InputProps {
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function Input({ onChangeText, value }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const colorIcon = isFocused ? COLORS.primary : COLORS.text_secondary;
  return (
    <View style={styles.main}>
      <AntDesign name="search1" size={16} color={colorIcon} />
      <TextInput
        placeholder="Search"
        value={value}
        onChangeText={onChangeText}
        selectionColor={COLORS.primary}
        style={{
          width: "90%",
          fontFamily: FontFamily[400],
          color: COLORS.text,
        }}
        placeholderTextColor={COLORS.text_secondary}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: 40,
    backgroundColor: COLORS.black,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
