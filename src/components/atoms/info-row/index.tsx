import { COLORS } from "@/src/theme/colors";
import { StyleSheet, View } from "react-native";
import { Typography } from "../typography";

interface InfoRowProps {
  label: string;
  value: string;
}

export default function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View style={styles.row}>
      <Typography color={COLORS.text_secondary}>{label}</Typography>
      <Typography color={COLORS.text} fontWeight="500">
        {value.length ? value : "No information"}
      </Typography>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
});
