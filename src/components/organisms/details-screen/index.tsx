import InfoRow from "@/src/components/atoms/info-row";
import { Typography } from "@/src/components/atoms/typography";
import WrapperScreens from "@/src/components/atoms/wrapper-screens";
import useGetCrytoById from "@/src/hooks/useGetCrytoById";
import { COLORS } from "@/src/theme/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import Conditional from "../../atoms/conditional";
import Row from "../../atoms/row";
import ErrorScreen from "../../molecules/error-screen";
import InformationLoading from "../../molecules/loadings/information-loading";
import TopCryto from "../../molecules/top-cryto";

export default function DetailsScreen() {
  const params: { crytoId: string } = useLocalSearchParams();
  const { data, isLoading, error, refetch } = useGetCrytoById(params.crytoId);
  const { back } = useRouter();

  const infoRows = [
    { label: "Price BTC", value: data.price_btc },
    { label: "Price USD", value: `$${data.price_usd}` },
    { label: "Percentage change last 1h", value: `${data.percent_change_1h}%` },
    {
      label: "Percentage change last 24h",
      value: `${data.percent_change_24h}%`,
    },
    { label: "Percentage change last 7d", value: `${data.percent_change_7d}%` },
    { label: "Circulating Supply", value: data.csupply },
    { label: "Total Supply", value: data?.tsupply ?? "" },
    { label: "Maximum Supply", value: data?.msupply ?? "" },
  ];

  if (error) {
    return <ErrorScreen retry={refetch} />;
  }

  return (
    <WrapperScreens>
      <Conditional condition={isLoading}>
        <Conditional.If>
          <InformationLoading />
        </Conditional.If>

        <Conditional.Else>
          <Row justifyContent="flex-start" gap={16}>
            <Pressable onPress={back}>
              <AntDesign name="back" size={24} color={COLORS.text} />
            </Pressable>
            <Row gap={10}>
              <Typography fontSize={24} fontWeight="700" color={COLORS.primary}>
                {data.name}
              </Typography>
              <Typography
                fontSize={12}
                fontWeight="500"
                color={COLORS.text_secondary}
              >
                ({data.symbol})
              </Typography>
            </Row>
          </Row>
          <View style={{ marginVertical: 30, gap: 10 }}>
            {infoRows.map((row, index) => (
              <InfoRow key={index} label={row.label} value={row.value} />
            ))}
          </View>
        </Conditional.Else>
      </Conditional>

      <TopCryto />
    </WrapperScreens>
  );
}
