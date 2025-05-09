import useGetTopFive from "@/src/hooks/useGetTopFive";
import { COLORS } from "@/src/theme/colors";
import React from "react";
import { FlatList, View } from "react-native";
import { Typography } from "../../atoms/typography";
import CrytoCard from "../cryto-card";
import TopCrytoLoading from "../loadings/top-cryto-loading";

export default function TopCryto() {
  const { data, error, isLoading } = useGetTopFive();

  if (isLoading) {
    return <TopCrytoLoading />;
  }

  if (error) {
    return null;
  }

  return (
    <View>
      <Typography color={COLORS.primary} fontSize={20} fontWeight="bold">
        TOP 5
      </Typography>
      <FlatList
        data={data}
        renderItem={({ item }) => <CrytoCard cryto={item} rank={item.rank} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
}
