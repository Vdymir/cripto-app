import Skeleton from "@/src/components/atoms/skeleton";
import { View } from "react-native";

export default function InformationLoading() {
  return (
    <View>
      <Skeleton width={160} height={30} radius={10} />
      <View style={{ paddingVertical: 30, gap: 16 }}>
        {Array.from({ length: 8 }).map((_, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Skeleton width={100} height={14} radius={10} />
              <Skeleton width={80} height={14} radius={15} />
            </View>
          );
        })}
      </View>
    </View>
  );
}
