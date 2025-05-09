import { PERCENT_CHANGE } from "@/src/constants/percent_change";
import useGetCryto from "@/src/hooks/useGetCryto";
import { ICryto, PercentChange } from "@/src/interfaces/cryto.interface";
import { COLORS } from "@/src/theme/colors";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import FloatingButton from "../../atoms/floating-button";
import Input from "../../atoms/input";
import Row from "../../atoms/row";
import Tab from "../../atoms/tab";
import { Typography } from "../../atoms/typography";
import WrapperScreens from "../../atoms/wrapper-screens";
import CrytoCard from "../../molecules/cryto-card";
import ErrorScreen from "../../molecules/error-screen";
import CrytoScreenLoading from "../../molecules/loadings/cryto-screen-loading";

export default function CrytoScreen() {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, error, refetch } =
    useGetCryto();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [filterSelected, setFilterSelected] = useState<PercentChange>("1h");
  const [dataFiltered, setDataFiltered] = useState<ICryto[]>([]);
  const [search, setSearch] = useState("");
  const flatListRef = useRef<FlatList>(null);
  const height = useSharedValue(90);
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);
  const lastScrollY = useRef(0);

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const scrollDirection = offsetY - lastScrollY.current > 0 ? "down" : "up";
      lastScrollY.current = offsetY;

      setShowScrollButton(offsetY > 100);

      if (scrollDirection === "down" && offsetY > 50) {
        opacity.value = withTiming(0, { duration: 150, easing: Easing.ease });
        height.value = withTiming(0, { duration: 250, easing: Easing.ease });
        translateY.value = withSpring(-30, { damping: 15, stiffness: 100 });
      } else if (scrollDirection === "up" || offsetY < 20) {
        height.value = withSpring(90, { damping: 15, stiffness: 100 });
        opacity.value = withSpring(1, { damping: 15, stiffness: 100 });
        translateY.value = withSpring(0, { damping: 15, stiffness: 100 });
      }
    },
    []
  );

  const scrollToTop = useCallback(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  useEffect(() => {
    if (search) {
      const filteredData = data.filter((item) => {
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.symbol.toLowerCase().includes(search.toLowerCase())
        );
      });
      setDataFiltered(filteredData);
    } else {
      setDataFiltered(data);
    }
  }, [search, data]);

  if (isLoading) {
    return <CrytoScreenLoading />;
  }

  if (error) {
    return <ErrorScreen retry={refetch} />;
  }

  return (
    <WrapperScreens>
      <Animated.View style={[styles.header, animatedHeaderStyle]}>
        <Typography color={COLORS.primary} fontSize={25} fontWeight="900">
          Cryto
        </Typography>

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
      </Animated.View>

      <Input onChangeText={setSearch} value={search} />

      <FlatList
        ref={flatListRef}
        data={dataFiltered}
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
  header: {
    overflow: "hidden",
  },
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.grey,
    marginTop: 5,
  },
});
