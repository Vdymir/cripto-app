import { COLORS } from "@/src/theme/colors";
import React from "react";
import { View } from "react-native";
import ButtonOutline from "../../atoms/button-outline";
import { Typography } from "../../atoms/typography";
import WrapperScreens from "../../atoms/wrapper-screens";

interface ErrorScreenProps {
  retry?: () => {};
}

export default function ErrorScreen({ retry }: ErrorScreenProps) {
  return (
    <WrapperScreens>
      <Typography color={COLORS.primary} fontSize={25} fontWeight="900">
        Cryto
      </Typography>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Typography color={COLORS.text} fontSize={20} fontWeight="600">
          Ups something went wrong!
        </Typography>
        <ButtonOutline label="Retry" onPress={retry} />
      </View>
    </WrapperScreens>
  );
}
