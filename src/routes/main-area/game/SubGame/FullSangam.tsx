import { Flex } from "@mantine/core";
import { useParams } from "react-router";
import { SubGameHeader } from "@/components/ui/SubGameHeader";
import Clock from "@/components/ui/clock/Clock";
export function FullSangam() {
  const { game } = useParams();
  return (
    <Flex p={18}>
      <SubGameHeader game={`${game}`} subGame="Full Sangam"></SubGameHeader>
      <Clock />
    </Flex>
  );
}
