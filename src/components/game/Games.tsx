import { Flex } from "@mantine/core";
import { GameCard } from "./GameCard";
import { gameList } from "@/libs/gameList";

export function Games() {
  return (
    <Flex direction={"column"} py={16} px={16} rowGap={8}>
      {gameList.map((game, index) => (
        <GameCard
          key={index}
          title={game.title}
          chartLink={game.chartLink}
          open={game.open}
          close={game.close}
          digit={game.digit}
        />
      ))}
    </Flex>
  );
}
