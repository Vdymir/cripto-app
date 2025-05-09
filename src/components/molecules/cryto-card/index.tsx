import { ICryto } from "@/src/interfaces/cryto.interface";
import { COLORS } from "@/src/theme/colors";
import { useRouter } from "expo-router";
import { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Conditional from "../../atoms/conditional";
import { Typography } from "../../atoms/typography";

interface CrytoCardProps {
  cryto: ICryto;
  filter?: "24h" | "7d" | "1h";
  rank?: number;
}

const PriceChange = {
  "24h": "percent_change_24h",
  "7d": "percent_change_7d",
  "1h": "percent_change_1h",
};

function CrytoCard({ cryto, filter = "24h", rank }: CrytoCardProps) {
  const { push } = useRouter();

  const priceChange = cryto[PriceChange[filter] as keyof ICryto] as string;
  const priceChangeColor = !priceChange.includes("-")
    ? COLORS.green
    : COLORS.red;

  const handlePress = () => {
    push(`/${cryto.id}`);
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <View style={styles.main}>
        <View>
          <Typography fontWeight="500" fontSize={16} color={COLORS.text}>
            {cryto.name}
          </Typography>
          <Typography
            fontWeight="400"
            fontSize={14}
            color={COLORS.text_secondary}
          >
            {cryto.symbol}
          </Typography>
        </View>

        <Conditional condition={Boolean(rank)}>
          <Conditional.If>
            <Typography
              fontWeight="bold"
              fontSize={18}
              color={COLORS.text_secondary}
            >
              RANK #{rank}
            </Typography>
          </Conditional.If>

          <Conditional.Else>
            <View style={{ alignItems: "flex-end" }}>
              <Typography fontWeight="500" fontSize={16} color={COLORS.text}>
                ${cryto.price_usd}
              </Typography>
              <Typography
                fontWeight="400"
                fontSize={14}
                color={priceChangeColor}
              >
                {priceChange}%
              </Typography>
            </View>
          </Conditional.Else>
        </Conditional>
      </View>
    </TouchableOpacity>
  );
}
export default memo(CrytoCard);
const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
