import {
  Flex,
  Text,
  Card,
  Paper,
  Stack,
  Group,
  Chip,
  Autocomplete,
  TextInput,
  Button,
} from "@mantine/core";
import { useParams } from "react-router";
import { SubGameHeader } from "@/components/ui/SubGameHeader";
import { triplePanna } from "@/libs/pana";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { DigitalClock } from "@/components/ui/clock/DigitalClock";
import Clock from "@/components/ui/clock/Clock";
import { gameList } from "@/libs/gameList";
import { useState } from "react";

const formSchema = z.object({
  marketStatus: z.enum(["open", "close"], {
    message: "Select a market session",
  }),
  panna: z.string().refine((val) => triplePanna.includes(val), {
    message: "Enter a valid Panna",
  }),
  points: z.coerce
    .number()
    .gt(9, { message: "Minimum bet amount is 10." })
    .lt(99999, { message: "Maximum amount is 99999." }),
});

type formData = z.infer<typeof formSchema>;

export function TriplePanna() {
  const { game } = useParams();
  const [options, setOptions] = useState<string[]>([]);
  const [finalData, setFinalData] = useState<formData[]>([]);
  const form = useForm<formData>({
    validate: zodResolver(formSchema),
    initialValues: {
      marketStatus: "" as "open" | "close",
      panna: "",
      points: "" as unknown as number,
    },
  });
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

  const handleFormSubmit = (value: formData) => {
    setFinalData([...finalData, value]);
    console.log(value);
    form.reset();
  };

  return (
    <Flex p={18} direction={"column"}>
      <SubGameHeader game={`${game}`} subGame="Triple Panna"></SubGameHeader>
      <form
        onSubmit={form.onSubmit((value) => {
          handleFormSubmit(value);
        })}
      >
        <Card my={8}>
          <Chip.Group
            value={form.values.marketStatus}
            onChange={(value) =>
              form.setFieldValue("marketStatus", value as "open" | "close")
            }
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
          {form.errors.marketStatus && (
            <Text ta={"center"} c="red">
              {form.errors.marketStatus}
            </Text>
          )}
        </Card>
        <Flex
          bg={""}
          align={"center"}
          columnGap={6}
          h={"40px"}
          justify={"center"}
        >
          <Clock />
          <DigitalClock fontSize="16" color="black"></DigitalClock>
        </Flex>

        <Card withBorder my={12} bd={"2px solid black"}>
          <Stack p={12}>
            <Autocomplete
              inputMode="numeric"
              key={form.key("pa")}
              {...form.getInputProps("panna")}
              maxLength={3}
              name="digit"
              label="Triple Panna"
              placeholder="Select Panna Number"
              data={options}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setOptions(
                  triplePanna.filter((value) =>
                    String(value).includes(e.target.value),
                  ),
                )
              }
              limit={10}
            />
            <TextInput
              size="md"
              name="points"
              key={form.key("points")}
              {...form.getInputProps("points")}
              label="Points"
              inputMode="numeric"
              maxLength={5}
              placeholder="Enter Points"
              mb={14}
            />

            <Button fullWidth type="submit">
              Add
            </Button>
          </Stack>
        </Card>
      </form>
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
              ta={"center"}
              style={{ borderRadius: 4 }}
            >
              {item.panna}
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
                (sum, item) => sum + parseInt(String(item.points)),
                0,
              )}
            </Text>
            <Text fz={12} ta="center">
              5{/*TODO: Here we have to update balance */}
            </Text>
          </Group>
        </Paper>
      </Card>
    </Flex>
  );
}
