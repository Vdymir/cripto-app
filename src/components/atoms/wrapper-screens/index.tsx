import { COLORS } from "@/src/theme/colors";
import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";

interface WrapperScreensProps {
  children: React.ReactNode | React.ReactNode[];
}
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export default function WrapperScreens({ children }: WrapperScreensProps) {
  return (
    <Fragment>
      <View style={{ height: STATUSBAR_HEIGHT, backgroundColor: COLORS.black }}>
        <SafeAreaView>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        </SafeAreaView>
      </View>
      <View style={{ padding: 16, flex: 1 }}>{children}</View>
    </Fragment>
  );
}
