import Skeleton from "@/src/components/atoms/skeleton";
import WrapperScreens from "@/src/components/atoms/wrapper-screens";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function CrytoScreenLoading() {
  return (
    <WrapperScreens>
      <View style={styles.main}>
        <Skeleton height={20} width={100} radius={4} />
        <Skeleton height={30} width={30} radius={4} />
      </View>
      <View style={{ gap: 16 }}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} height={70} width={"100%"} radius={4} />
        ))}
      </View>
    </WrapperScreens>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
