import { COLORS } from "@/src/theme/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

interface FloatingButtonProps {
  scrollToTop: () => void;
}

export default function FloatingButton({ scrollToTop }: FloatingButtonProps) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSpring(1);
  }, []);

  return (
    <Animated.View style={{ opacity }}>
      <Pressable style={styles.scrollButton} onPress={scrollToTop}>
        <AntDesign name="up" size={24} color={COLORS.text} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  scrollButton: {
    position: "absolute",
    bottom: 50,
    right: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    padding: 10,
  },
});
