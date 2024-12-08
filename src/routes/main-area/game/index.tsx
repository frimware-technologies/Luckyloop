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

import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { GameRate } from "@/components/DrawerContent/GameRate";
import shield from "@/assets/images/GameCard/shield.png";
import { options } from "@/libs/gameList";
import { gameList } from "@/libs/gameList";
import { notifications } from "@mantine/notifications";
import { DigitalClock } from "@/components/ui/clock/DigitalClock";
import Clock from "@/components/ui/clock/Clock";

export const Game = () => {
  const { game } = useParams();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  return (
    <Flex px={18} py={18} direction={"column"}>
      <Flex
        bg={"cyan"}
        h={64}
        px={18}
        align={"center"}
        style={{ borderTopLeftRadius: 56, borderBottomRightRadius: 56 }}
      >
        <Text fw={600} fz={"md"} c={"white"}>
          {game?.split("-").join(" ").toUpperCase()}
        </Text>
        <Flex align={"center"} columnGap={4} ml={"auto"}>
          <Clock></Clock>
          <DigitalClock fontSize="14" color="white"></DigitalClock>
        </Flex>
      </Flex>

      <Grid py={18} align={"end"}>
        {options.map((option, index) => (
          <Grid.Col key={index} span={4}>
            <Anchor
              w={"30%"}
              onClick={() => {
                if (index === 1 || index === 5 || index === 6) {
                  gameList.forEach((eachGame) => {
                    if (
                      eachGame.title ===
                      game?.split("-").join(" ").toUpperCase()
                    ) {
                      const now = new Date();
                      const [openHours, openMins, openPeriod] =
                        eachGame.open
                          .match(/(\d+):(\d+)\s*(AM|PM)/)
                          ?.slice(1) ?? [];
                      const start = new Date();
                      start.setHours(
                        openPeriod === "AM"
                          ? parseInt(openHours) % 12
                          : (parseInt(openHours) % 12) + 12,
                        parseInt(openMins),
                        0,
                        0,
                      );
                      if (now < start) {
                        navigate(`/games/${game}/${option.link}`);
                      } else {
                        notifications.show({
                          color: "red",
                          message: "This game is available before market open!",
                        });
                      }
                      return;
                    }
                  });
                } else {
                  navigate(`/games/${game}/${option.link}`);
                }
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
