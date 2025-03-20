import {
  Autocomplete,
  Button,
  Card,
  Chip,
  Flex,
  Text,
  Group,
  Stack,
  TextInput,
  Paper,
} from "@mantine/core";
import { useParams } from "react-router";
import { SubGameHeader } from "@/components/ui/SubGameHeader";
import Clock from "@/components/ui/clock/Clock";
import { DigitalClock } from "@/components/ui/clock/DigitalClock";
import { gameList } from "@/libs/gameList";
import { useState } from "react";
import { z } from "zod";
import { singlePanna } from "@/libs/pana";
import { useForm, zodResolver } from "@mantine/form";

const FormSchema = z.object({
  marketStatus: z.enum(["open", "close"], {
    message: "Choose a market session",
  }),
  panna: z.string().refine((val) => singlePanna.includes(val), {
    message: "Panna numbers is incorrect",
  }),
  points: z
    .union([
      z.coerce.number().gt(9).lt(99999),
      z.literal("").transform(() => 0),
    ])
    .refine((val) => val > 0, {
      message: "Minimum bet amount is 10",
    }),
});

type FormData = z.infer<typeof FormSchema>;

export function SinglePanna() {
  const { game } = useParams();
  const [options, setOptions] = useState<string[]>([]);
  const [finalData, setFinalData] = useState<FormData[]>([]);

  const form = useForm<FormData>({
    initialValues: {
      marketStatus: "" as "open" | "close",
      panna: "",
      points: "" as unknown as number,
    },
    validate: zodResolver(FormSchema),
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

  const handleFormSubmit = (value: FormData) => {
    setFinalData([...finalData, value]);
    form.reset();
  };

  return (
    <Flex p={18} direction={"column"}>
      <SubGameHeader game={`${game}`} subGame="Signle Panna"></SubGameHeader>
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
              key={form.key("panna")}
              {...form.getInputProps("panna")}
              minLength={2}
              name="digit"
              label="Single Panna"
              placeholder="Select Panna Number"
              data={options}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setOptions(
                  singlePanna.filter((value) =>
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
              maxLength={6}
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
      <Button
        // loading={loading}
        pos={"fixed"}
        bottom={0}
        left={0}
        right={0}
        m={"18"}
        // onClick={handleConfirmation}
      >
        Confirm
      </Button>
    </Flex>
  );
}
