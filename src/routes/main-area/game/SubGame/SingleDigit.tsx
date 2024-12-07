import {
  Flex,
  Chip,
  Group,
  Button,
  Grid,
  Text,
  TextInput,
  Card,
  Paper,
} from "@mantine/core";
import Clock from "@/components/ui/clock/Clock";
import { DigitalClock } from "@/components/ui/clock/DigitalClock";
import { useParams } from "react-router";
import { SubGameHeader } from "@/components/ui/SubGameHeader";
import { useState } from "react";
import { gameList } from "@/libs/gameList";
import { notifications } from "@mantine/notifications";

interface formData {
  number: string;
  points: string;
  market_status: string;
}

export function SingleDigit() {
  const { game } = useParams();
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [finalData, setFinalData] = useState<formData[] | []>([]);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [selectedMarketStatus, setMarketStatus] = useState("");
  const gameDetail = gameList.filter(
    (eachGame) => eachGame.title === game?.split("-").join(" ").toUpperCase(),
  );
  const open = gameDetail[0].open;
  const now = new Date();
  const [startHours, startMins, startPeriod] =
    open.match(/(\d+):(\d+)\s*(AM|PM)/)?.slice(1) ?? [];

  const start = new Date();
  start.setHours(
    startPeriod === "AM"
      ? parseInt(startHours) % 12
      : (parseInt(startHours) % 12) + 12,
    parseInt(startMins),
    0,
    0,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const marketStatus = selectedMarketStatus;
    const number = selectedNumber;
    const points = formData.get("points");

    if (!marketStatus || !number || !points) {
      notifications.show({
        autoClose: 1000,
        message: "Please selected Number and Market time.",
      });
      return;
    }

    const newFormData: formData = {
      number: number,
      points: points as string,
      market_status: marketStatus,
    };

    setFinalData([...finalData, newFormData]);
    setSelectedNumber("");
    setMarketStatus("");
    return;
  };

  return (
    <Flex p={18} mih={"100vh"} style={{ flexGrow: 1 }} direction={"column"}>
      <SubGameHeader game={`${game}`} subGame="Signle Digit"></SubGameHeader>
      <form
        action=""
        style={{
          margin: "18px 0 18px ",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit}
      >
        <Chip.Group
          value={selectedMarketStatus}
          onChange={setMarketStatus}
          multiple={false}
        >
          <Group justify="space-around">
            {start > now && (
              <Chip value="open" size="xl" color={"green"} radius="sm">
                Open
              </Chip>
            )}
            <Chip value="close" size="xl" color="green" radius="sm">
              Close
            </Chip>
          </Group>
        </Chip.Group>
        <Flex
          bg={""}
          align={"center"}
          columnGap={6}
          my={8}
          h={"40px"}
          justify={"center"}
        >
          <Clock />
          <DigitalClock color="black"></DigitalClock>
        </Flex>
        <Grid py={18} style={{ flexWrap: "wrap" }}>
          <Grid.Col span={3}>
            <Chip.Group
              value={selectedNumber}
              onChange={(value: string) => setSelectedNumber(value)}
              multiple={false}
            >
              <Flex justify="center" direction="column">
                {numbers.map((number, index) => (
                  <Chip
                    mb={12}
                    key={index}
                    value={number.toString()}
                    size="md"
                    color="green"
                    radius="sm"
                  >
                    {number}
                  </Chip>
                ))}
              </Flex>
            </Chip.Group>
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Card py={12} bd={"2px solid black"}>
              <Text c={"cyan"} fz={"xl"} ta={"center"}>
                Enter Points
              </Text>
              <TextInput
                type="number"
                min={10}
                max={99999}
                my={4}
                required
                name="points"
              />
              <Button type="submit" my={4}>
                Add
              </Button>
            </Card>

            <Card bg={"cyan.1"} shadow="xl" my={12}>
              <Flex justify="space-between">
                {["Numbers", "Points"].map((item, index) => (
                  <Text
                    key={index}
                    bd={"solid 1px black"}
                    px={2}
                    fz={12}
                    style={{ borderRadius: 4 }}
                  >
                    {item}
                  </Text>
                ))}
                <Button
                  size="compact-xs"
                  h={24}
                  color="red"
                  onClick={() => setFinalData([])}
                >
                  Delete All
                </Button>
              </Flex>

              {finalData.map((item, index) => (
                <Flex key={index} my={8} justify={"space-between"}>
                  <Text
                    bd={"solid 1px black"}
                    px={2}
                    fz={12}
                    w={18}
                    ta={"center"}
                    style={{ borderRadius: 4 }}
                  >
                    {item.number}
                  </Text>
                  <Text
                    bd={"solid 1px black"}
                    px={2}
                    fz={12}
                    style={{ borderRadius: 4 }}
                  >
                    {item.points}
                  </Text>
                  <Button
                    size="compact-xs"
                    h={24}
                    color="red"
                    onClick={() =>
                      setFinalData(finalData.filter((_, i) => i !== index))
                    }
                  >
                    Delete
                  </Button>
                </Flex>
              ))}
              <Paper my={18} py={14}>
                <Group grow>
                  <Text fz={12} ta="center">
                    Numbers
                  </Text>
                  <Text fz={12} ta="center">
                    Points
                  </Text>
                  <Text fz={12} ta="center">
                    Left Points
                  </Text>
                </Group>

                <Group grow>
                  <Text fz={12} ta="center">
                    {finalData.length}
                  </Text>
                  <Text fz={12} ta="center">
                    {finalData.reduce(
                      (sum, item) => sum + parseInt(item.points),
                      0,
                    )}
                  </Text>
                  <Text fz={12} ta="center">
                    5{/*TODO: Here we have to update balance */}
                  </Text>
                </Group>
              </Paper>
            </Card>
          </Grid.Col>
        </Grid>
        <Button mt={"auto"}>Submit</Button>
      </form>
    </Flex>
  );
}
