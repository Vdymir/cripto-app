import React from "react";
import { SafeAreaView, View } from "react-native";

interface WrapperScreensProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function WrapperScreens({ children }: WrapperScreensProps) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16 }}>{children}</View>
    </SafeAreaView>
  );
}
