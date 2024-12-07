import { Flex } from "@mantine/core";
import { useParams } from "react-router";
import { SubGameHeader } from "@/components/ui/SubGameHeader";
export function Spdptp() {
  const { game } = useParams();
  return (
    <Flex p={18}>
      <SubGameHeader game={`${game}`} subGame="SPDPTP"></SubGameHeader>
    </Flex>
  );
}
