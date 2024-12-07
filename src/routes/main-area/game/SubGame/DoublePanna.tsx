import { Flex } from "@mantine/core";
import { useParams } from "react-router";
import { SubGameHeader } from "@/components/ui/SubGameHeader";
export function DoublePanna() {
  const { game } = useParams();
  return (
    <Flex p={18}>
      <SubGameHeader game={`${game}`} subGame="Double Panna"></SubGameHeader>
    </Flex>
  );
}
