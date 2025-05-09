import { COLORS } from "@/src/theme/colors";
import { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export type AnimateValue =
  | number
  | Animated.SharedValue<number>
  | "auto"
  | `${number}%`
  | null
  | undefined;

export interface SkeletonProps {
  width: AnimateValue;
  height: AnimateValue;
  radius?: number;
  isCircle?: boolean;
}

export default function Skeleton({
  height,
  width,
  isCircle = false,
  radius = 0,
}: SkeletonProps) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.1, { duration: 500, easing: Easing.ease }),
        withTiming(0.3, { duration: 500, easing: Easing.ease })
      ),
      -1,
      false
    );

    return () => {
      opacity.value = 0.3;
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          height,
          width,
          borderRadius: isCircle ? Number(width) / 2 : radius,
          backgroundColor: COLORS.grey,
        },
      ]}
    />
  );
}
