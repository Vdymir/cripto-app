import useGetCryto from "@/src/hooks/useGetCryto";
import { COLORS } from "@/src/theme/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import FloatingButton from "../../atoms/floating-button";
import { Typography } from "../../atoms/typography";
import WrapperScreens from "../../atoms/wrapper-screens";
import CrytoCard from "../../molecules/cryto-card";
import CrytoScreenLoading from "../../molecules/loadings/cryto-screen-loading";

export default function CrytoScreen() {
  const { data, isLoading, isFetchingNextPage, fetchNextPage } = useGetCryto();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [filterSelected, setFilterSelected] = useState<"24h" | "7d" | "1h">(
    "24h"
  );
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      setShowScrollButton(offsetY > 100);
    },
    []
  );

  const scrollToTop = useCallback(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  if (isLoading) {
    return <CrytoScreenLoading />;
  }

  return (
    <WrapperScreens>
      <View style={styles.main}>
        <Typography color={COLORS.primary} fontSize={22} fontWeight="900">
          Cryto
        </Typography>
        <TouchableOpacity activeOpacity={0.6}>
          <AntDesign name="filter" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        initialNumToRender={15}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => {
          return <CrytoCard cryto={item} filter={filterSelected} />;
        }}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          fetchNextPage();
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListFooterComponent={() => {
          if (isFetchingNextPage)
            return (
              <ActivityIndicator
                style={{ height: 100 }}
                size={20}
                color="gray"
              />
            );
        }}
      />
      {showScrollButton && <FloatingButton scrollToTop={scrollToTop} />}
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
