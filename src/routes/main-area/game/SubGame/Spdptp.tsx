import {
  Flex,
  Chip,
  Group,
  Checkbox,
  Card,
  Stack,
  Autocomplete,
  TextInput,
  Button,
} from "@mantine/core";
import { useParams } from "react-router";
import { gameList } from "@/libs/gameList";
import { SubGameHeader } from "@/components/ui/SubGameHeader";
import { useState } from "react";
import Clock from "@/components/ui/clock/Clock";
import { DigitalClock } from "@/components/ui/clock/DigitalClock";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";

const formSchema = z.object({
  digit: z.coerce
    .number()
    .gte(0, { message: "Select a digit between 0-9" })
    .lt(10, { message: "Select a digit between 0-9" }),
  points: z.coerce
    .number()
    .gte(10, { message: "Minimum bet amount is 10" })
    .lt(99999, { message: "Maximum bet amount is 99999" }),
});

type formData = z.infer<typeof formSchema>;

export function Spdptp() {
  const { game } = useParams();
  const [selectedMarketStatus, setMarketStatus] = useState("");

  //form for validation
  const form = useForm<formData>({
    validate: zodResolver(formSchema),
    initialValues: {
      digit: "" as unknown as number,
      points: "" as unknown as number,
    },
  });

  //check for market open and close status
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

  return (
    <Flex p={18} direction={"column"}>
      <SubGameHeader game={`${game}`} subGame="SPDPTP"></SubGameHeader>
      <form
        style={{
          margin: "18px 0 18px ",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
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
          <DigitalClock fontSize="14" color="black"></DigitalClock>
        </Flex>
        <Card bd={"2px solid black"}>
          <Stack p={12} gap={"sm"}>
            <Group justify="center" my={12}>
              <Checkbox defaultChecked label="SP" />
              <Checkbox defaultChecked label="DP" />
              <Checkbox defaultChecked label="TP" />
            </Group>
            <Autocomplete
              label="SPDPTP Game"
              placeholder="Select Digit Number"
              data={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
            ></Autocomplete>
            <TextInput label="Points" placeholder="Enter Points"></TextInput>
            <Button fullWidth> Add</Button>
          </Stack>
        </Card>
      </form>
    </Flex>
  );
}
