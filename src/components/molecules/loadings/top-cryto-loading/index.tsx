import Skeleton from "@/src/components/atoms/skeleton";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function TopCrytoLoading() {
  return (
    <View style={{ gap: 16 }}>
      <Skeleton width={60} height={20} radius={10} />
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <View key={index} style={styles.main}>
            <View style={{ gap: 2 }}>
              <Skeleton width={100} height={20} radius={10} />
              <Skeleton width={70} height={18} radius={10} />
            </View>
            <Skeleton width={110} height={25} radius={15} />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
