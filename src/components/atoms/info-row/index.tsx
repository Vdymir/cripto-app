import { COLORS } from "@/src/theme/colors";
import Row from "../row";
import { Typography } from "../typography";

interface InfoRowProps {
  label: string;
  value: string;
}

export default function InfoRow({ label, value }: InfoRowProps) {
  return (
    <Row>
      <Typography color={COLORS.text_secondary}>{label}</Typography>
      <Typography color={COLORS.text} fontWeight="500">
        {value.length ? value : "No information"}
      </Typography>
    </Row>
  );
}
