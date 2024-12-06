import { Card, Flex, Text } from "@mantine/core";

export const SubGameHeader = ({
  game,
  subGame,
}: {
  game: string;
  subGame: string;
}) => {
  return (
    <Flex gap={24} style={{ zIndex: 400 }} pos={"sticky"} top={0}>
      <Card bg={"cyan"} w={"90vw"} h={60} p={0} radius={"56px 0 56px 0 "}>
        <Text ta={"center"} fw={500} c={"white"} fz={16}>
          {game?.split("-").join(" ").toUpperCase()}
        </Text>
        <Text ta={"center"} fw={500} c={"white"}>
          {subGame}
        </Text>
      </Card>
    </Flex>
  );
};
