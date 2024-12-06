import {
  Anchor,
  Card,
  Container,
  Drawer,
  Flex,
  Grid,
  Image,
  Text,
} from "@mantine/core";
import { DigitalClock } from "@/components/ui/clock/DigitalClock";

import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { GameRate } from "@/components/DrawerContent/GameRate";
import shield from "@/assets/images/GameCard/shield.png";
import { options } from "@/libs/gameList";
import { gameList } from "@/libs/gameList";
import { notifications } from "@mantine/notifications";

export const Game = () => {
  const { game } = useParams();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  return (
    <Flex px={18} py={18} direction={"column"}>
      <Grid py={18} align={"end"}>
        {options.map((option, index) => (
          <Grid.Col key={index} span={4}>
            <Anchor
              w={"30%"}
              onClick={() => {
                // if (index === 1) {
                //   gameList.forEach((eachGame) => {
                //     if (
                //       eachGame.title ===
                //       game?.split("-").join(" ").toUpperCase()
                //     ) {
                //       const now = new Date();
                //       const [endHours, endMins, endPeriod] =
                //         eachGame.open
                //           .match(/(\d+):(\d+)\s*(AM|PM)/)
                //           ?.slice(1) ?? [];
                //       const end = new Date();
                //       end.setHours(
                //         endPeriod === "AM"
                //           ? parseInt(endHours) % 12
                //           : (parseInt(endHours) % 12) + 12,
                //         parseInt(endMins),
                //         0,
                //         0,
                //       );
                //       if (now > end) {
                //         navigate(`/games/${game}/${option.link}`);
                //         return;
                //       }
                //       notifications.show({
                //         color: "red",
                //         message: "This game is available before market open!",
                //       });
                //       return;
                //     }
                //   });
                // }
                navigate(`/games/${game}/${option.link}`);
              }}
            >
              <Container key={index} p={0} m={0} pos={"relative"}>
                <Image src={shield} w={"100%"}></Image>
                <Container
                  pos={"absolute"}
                  top={"50%"}
                  left={"50%"}
                  style={{
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Text c={"#FFD700"} ta={"center"} style={{ margin: 0 }}>
                    {option.title}
                  </Text>
                </Container>
              </Container>
            </Anchor>
          </Grid.Col>
        ))}
      </Grid>

      <Flex justify={"end"} mt={"auto"}>
        <Card
          c={"white"}
          radius={16}
          onClick={() => setOpened(true)}
          shadow="xl"
          mt={"10vh"}
          bg={"cyan"}
        >
          Game Rates
        </Card>
      </Flex>
      <Drawer
        offset={8}
        radius="md"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Game Rates"
      >
        {/* Drawer content */}
        <GameRate></GameRate>
      </Drawer>
    </Flex>
  );
};
