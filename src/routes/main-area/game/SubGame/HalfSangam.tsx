import {
  Autocomplete,
  Button,
  Card,
  Flex,
  Group,
  Select,
  TextInput,
  Text,
  Paper,
} from "@mantine/core";
import { useParams } from "react-router";
import { SubGameHeader } from "@/components/ui/SubGameHeader";
import Clock from "@/components/ui/clock/Clock";
import { DigitalClock } from "@/components/ui/clock/DigitalClock";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import { pana } from "@/libs/pana";

const formSchema = z
  .object({
    selectedOption: z.enum(["open-close", "close-open"], {
      message: "Select an option",
    }),
    openDigit: z.coerce
      .number()
      .optional()
      .refine((val) => val === undefined || (val >= 0 && val <= 9), {
        message: "Open Digit must be between 0 and 9",
      }),
    closePanna: z.string().optional(),
    closeDigit: z.coerce
      .number()
      .optional()
      .refine((val) => val === undefined || (val >= 0 && val <= 9), {
        message: "Close Digit must be between 0 and 9",
      }),
    openPanna: z.string().optional(),
    points: z.coerce
      .number()
      .gte(10, { message: "Minimum bet amount is 10" })
      .lte(99999, { message: "Maximum bet amount is 99999" }),
  })
  .refine(
    (data) => {
      if (data.selectedOption === "open-close") {
        return data.openDigit !== undefined && data.closePanna?.trim() !== "";
      }
      return true;
    },
    {
      message: "Open Digit and Close Panna are required",
      path: ["openDigit"],
    },
  )
  .refine(
    (data) => {
      if (data.selectedOption === "close-open") {
        return data.closeDigit !== undefined && data.openPanna?.trim() !== "";
      }
      return true;
    },
    {
      message: "Close Digit and Open Panna required",
      path: ["closeDigit"],
    },
  )
  .refine(
    (data) => {
      if (data.selectedOption === "open-close") {
        return pana.includes(data.closePanna || "");
      }
      return true;
    },
    { message: "Enter a valid Close Panna", path: ["closePanna"] },
  )
  .refine(
    (data) => {
      if (data.selectedOption === "close-open") {
        return pana.includes(data.openPanna || "");
      }
      return true;
    },
    { message: "Enter a valid Open Panna", path: ["openPanna"] },
  );

type FormData = z.infer<typeof formSchema>;

export function HalfSangam() {
  const { game } = useParams();
  const [formType, setFormType] = useState("open-close");
  const [options, setOptions] = useState<string[]>([]);
  const [finalData, setFinalData] = useState<FormData[]>([]);

  const form = useForm<FormData>({
    validate: zodResolver(formSchema),
    initialValues: {
      selectedOption: "open-close",
      openDigit: "" as unknown as number,
      closePanna: "",
      closeDigit: "" as unknown as number,
      openPanna: "",
      points: "" as unknown as number,
    },
  });

  useEffect(() => {
    setOptions(pana); // Initialize with all available Panna values
  }, []);

  const handleSubmit = (value: FormData) => {
    setFinalData([...finalData, value]);
    form.reset();
  };

  return (
    <Flex p={18} direction={"column"}>
      <SubGameHeader game={`${game}`} subGame="Half Sangam" />

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
      <Card withBorder>
        <Flex rowGap={8} direction={"column"}>
          <form
            onSubmit={form.onSubmit((value) => {
              handleSubmit(value);
            })}
          >
            <Select
              value={form.getInputProps("selectedOption").value} // Bind to the form state
              onChange={(value: string | null) => {
                if (value) {
                  setFormType(value);
                  form.setFieldValue(
                    "selectedOption",
                    value as "open-close" | "close-open",
                  );
                }
              }}
              data={[
                { value: "open-close", label: "Open Digit, Close Panna" },
                { value: "close-open", label: "Close Digit, Open Panna" },
              ]}
            />

            {formType === "open-close" && (
              <>
                <Autocomplete
                  label="Open Digit"
                  placeholder="Enter Open Digit"
                  key={form.key("openDigit")}
                  {...form.getInputProps("openDigit")}
                  data={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                  limit={10}
                />

                <Autocomplete
                  label="Close Panna"
                  placeholder="Enter Close Panna"
                  {...form.getInputProps("closePanna")}
                  key={form.key("closePanna")}
                  data={options}
                  onChange={(value) => {
                    form.setFieldValue("closePanna", value);
                    setOptions(pana.filter((item) => item.includes(value)));
                  }}
                  limit={10}
                />
              </>
            )}

            {formType === "close-open" && (
              <>
                <Autocomplete
                  label="Close Digit"
                  placeholder="Enter Close Digit"
                  {...form.getInputProps("closeDigit")}
                  key={form.key("closeDigit")}
                  data={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                  limit={10}
                />

                <Autocomplete
                  label="Open Panna"
                  placeholder="Enter Open Panna"
                  key={form.key("openPanna")}
                  {...form.getInputProps("openPanna")}
                  data={options}
                  onChange={(value) => {
                    form.setFieldValue("openPanna", value);
                    setOptions(pana.filter((item) => item.includes(value)));
                  }}
                  limit={10}
                />
              </>
            )}

            <TextInput
              label="Enter Points"
              placeholder="Enter Points"
              key={form.key("points")}
              {...form.getInputProps("points")}
            />
            <Group mt="md">
              <Button type="submit" fullWidth>
                Add
              </Button>
            </Group>
          </form>
        </Flex>
      </Card>
      <Card bg={"cyan.1"} shadow="xl" my={12}>
        <Flex mb={12} justify="space-between" align={"center"} columnGap={10}>
          {["Close Digit", "Open Pana", "Enter points"].map((item, index) => (
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
            Delete All
          </Text>
        </Flex>

        {finalData.length > 0 && (
          <Flex direction="column" gap={8}>
            {finalData.map((item, index) => (
              <Paper key={index} p="sm" withBorder>
                <Flex justify="space-between" align="center">
                  <Text fz={12}>
                    {item.selectedOption === "open-close"
                      ? `Open digit: ${item.openDigit}, Close Panna: ${item.closePanna}`
                      : `Close digit: ${item.closeDigit}, Open Panna: ${item.openPanna}`}
                  </Text>
                  <Text fz={12}>Points: {item.points}</Text>
                  <Button
                    size="compact-xs"
                    h={24}
                    ml={4}
                    color="red"
                    onClick={() =>
                      setFinalData(finalData.filter((_, i) => i !== index))
                    }
                  >
                    Delete
                  </Button>
                </Flex>
              </Paper>
            ))}
          </Flex>
        )}
        <Paper my={18} py={14}>
          <Group grow>
            {["Numbers", "Points", "LeftPoints"].map((text, index) => (
              <Text key={index} fz={12} ta="center">
                {text}
              </Text>
            ))}
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
