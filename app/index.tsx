import { Typography } from "@/src/components/atoms/typography";
import WrapperScreens from "@/src/components/atoms/wrapper-screens";
import { COLORS } from "@/src/theme/colors";

export default function Index() {
  return (
    <WrapperScreens>
      <Typography color={COLORS.primary} fontSize={18} fontWeight="500">
        Cryto
      </Typography>
    </WrapperScreens>
  );
}
