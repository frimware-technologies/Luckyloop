import {
  Autocomplete,
  Button,
  Card,
  Flex,
  Stack,
  TextInput,
  Paper,
  Group,
  Text,
} from "@mantine/core";
import { useParams } from "react-router";
import { SubGameHeader } from "@/components/ui/SubGameHeader";
import Clock from "@/components/ui/clock/Clock";
import { DigitalClock } from "@/components/ui/clock/DigitalClock";
import { pana } from "@/libs/pana";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";

const formSchema = z.object({
  openPana: z.string().refine((val) => pana.includes(val), {
    message: "Please select a valid pana number",
  }),
  closePana: z.string().refine((val) => pana.includes(val), {
    message: "Please select a valid pana number",
  }),
  points: z.coerce
    .number()
    .gte(10, { message: "Minimum bet amount is 10" })
    .lte(99999, { message: "Maximum bet amount is 99999" }),
});

type formData = z.infer<typeof formSchema>;

export function FullSangam() {
  const [options, setOptions] = useState<string[]>([]);
  const [finalData, setFinalData] = useState<formData[]>([]);

  const { game } = useParams();
  const form = useForm<formData>({
    validate: zodResolver(formSchema),
    initialValues: {
      openPana: "",
      closePana: "",
      points: "" as unknown as number,
    },
  });

  const handleSubmit = (value: formData) => {
    setFinalData([...finalData, value]);
    console.log(value);
    form.reset();
  };

  return (
    <Flex p={18} direction={"column"}>
      <SubGameHeader game={`${game}`} subGame="Full Sangam"></SubGameHeader>
      <Flex
        align={"center"}
        columnGap={6}
        my={12}
        justify={"center"}
        h={"40px"}
      >
        <Clock />
        <DigitalClock fontSize="16" color="black" />
      </Flex>

      <Card withBorder my={12} bd={"2px solid black"}>
        <form onSubmit={form.onSubmit((value) => handleSubmit(value))}>
          <Stack gap={"sm"} px={12}>
            <Autocomplete
              inputMode="numeric"
              key={form.key("openPana")}
              {...form.getInputProps("openPana")}
              maxLength={3}
              name="openPana"
              label="Open Pana"
              placeholder="Select Pana Number"
              data={options}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setOptions(
                  pana.filter((value) =>
                    String(value).includes(e.target.value),
                  ),
                )
              }
              limit={10}
            />
            <Autocomplete
              inputMode="numeric"
              key={form.key("closePana")}
              {...form.getInputProps("closePana")}
              maxLength={3}
              name="closePana"
              label="Open Pana"
              placeholder="Select Pana Number"
              data={options}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setOptions(
                  pana.filter((value) =>
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
        </form>
      </Card>
      <Card bg={"cyan.1"} shadow="xl" my={12}>
        <Flex justify="space-between" align={"center"} columnGap={10}>
          {["Open Pana", "Close Pana", "Enter points"].map((item, index) => (
            <Text
              key={index}
              bd={"solid 1px black"}
              ta={"center"}
              style={{ borderRadius: 4 }}
            >
              {item}
            </Text>
          ))}
          <Text
            bd={"solid 1px black"}
            ta={"center"}
            style={{ borderRadius: 4 }}
            bg={"red"}
            c={"white"}
            miw={50}
            onClick={() => setFinalData([])}
          >
            Delelte All
          </Text>
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
              {item.openPana}
            </Text>
            <Text
              bd={"solid 1px black"}
              px={2}
              fz={12}
              style={{ borderRadius: 4 }}
            >
              {item.closePana}
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
          <Group px={14} gap={28} grow>
            {["Open Pana", "Close Pana", "Total Points", "Left Points"].map(
              (text, index) => (
                <Text key={index} fz={12} ta="center">
                  {text}
                </Text>
              ),
            )}
          </Group>

          <Group grow>
            <Text fz={12} ta="center">
              {finalData.length}
            </Text>
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
