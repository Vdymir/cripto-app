import { PERCENT_CHANGE } from "@/src/constants/percent_change";
import useGetCryto from "@/src/hooks/useGetCryto";
import { PercentChange } from "@/src/interfaces/cryto.interface";
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
import Row from "../../atoms/row";
import Tab from "../../atoms/tab";
import { Typography } from "../../atoms/typography";
import WrapperScreens from "../../atoms/wrapper-screens";
import CrytoCard from "../../molecules/cryto-card";
import CrytoScreenLoading from "../../molecules/loadings/cryto-screen-loading";

export default function CrytoScreen() {
  const { data, isLoading, isFetchingNextPage, fetchNextPage } = useGetCryto();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [filterSelected, setFilterSelected] = useState<PercentChange>("1h");
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
      <Row>
        <Typography color={COLORS.primary} fontSize={25} fontWeight="900">
          Cryto
        </Typography>
        <TouchableOpacity activeOpacity={0.6}>
          <AntDesign name="filter" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </Row>

      <Row marginTop={20}>
        <Typography color={COLORS.text_secondary} fontWeight="bold">
          See percent change by last:
        </Typography>
        <Row gap={7}>
          {PERCENT_CHANGE.map((item) => (
            <Tab
              label={item}
              active={item === filterSelected}
              onPress={() => setFilterSelected(item)}
              key={item}
            />
          ))}
        </Row>
      </Row>

      <View style={styles.line} />

      <FlatList
        ref={flatListRef}
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        initialNumToRender={15}
        style={{ marginTop: 10 }}
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
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.grey,
    marginTop: 5,
  },
});
