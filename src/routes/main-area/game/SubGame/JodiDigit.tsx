import {
  Autocomplete,
  Button,
  Card,
  Flex,
  Stack,
  TextInput,
  Text,
  Paper,
  Group,
} from "@mantine/core";
import { useParams } from "react-router";
import { SubGameHeader } from "@/components/ui/SubGameHeader";
import Clock from "@/components/ui/clock/Clock";
import { DigitalClock } from "@/components/ui/clock/DigitalClock";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

interface formData {
  jodiDigit: string;
  points: string;
}

export function JodiDigit() {
  const { game } = useParams();
  const [options, setOptions] = useState<string[]>([]);

  const [finalData, setFinalData] = useState<formData[] | []>([]);
  // Handle changes in the input field
  const handleInputChange = (inputValue: string) => {
    if (!/^\d?$/.test(inputValue)) return; // Allow only single digits or empty input

    if (inputValue === "") {
      setOptions([]); // Reset options when input is cleared
    } else {
      const digit = parseInt(inputValue, 10);
      const newOptions = Array.from({ length: 10 }, (_, i) => {
        const num = digit * 10 + i;
        return num < 10 ? `0${num}` : num.toString(); // Add leading zero for single digits
      });
      setOptions(newOptions);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const jodiDigit = formData.get("jodi-digit");
    const points = formData.get("points");
    if (!jodiDigit || !points) {
      notifications.show({
        message: "! Enter Points and jodi digit",
      });
      return;
    }

    setFinalData([
      ...finalData,
      { jodiDigit: `${jodiDigit}`, points: `${points}` },
    ]);
    return;
  };

  return (
    <Flex p={18} direction={"column"}>
      <SubGameHeader game={`${game}`} subGame="Jodi Digit"></SubGameHeader>
      <Flex
        bg={""}
        align={"center"}
        columnGap={6}
        my={12}
        h={"40px"}
        justify={"center"}
      >
        <Clock />
        <DigitalClock fontSize="16" color="black"></DigitalClock>
      </Flex>
      <Card withBorder bd={"2px solid black"}>
        <form onSubmit={handleSubmit}>
          <Stack p={12}>
            <Autocomplete
              inputMode="numeric"
              maxLength={2}
              name="jodi-digit"
              label="Jodi Digit"
              placeholder="Select Jodi Number"
              data={options}
              onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(event.target.value)
              }
              limit={10} // Limit to 10 suggestions
            />
            <TextInput
              size="md"
              name="points"
              label="Points"
              maxLength={6}
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
              {item.jodiDigit}
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
              {finalData.reduce((sum, item) => sum + parseInt(item.points), 0)}
            </Text>
            <Text fz={12} ta="center">
              5{/*TODO: Here we have to update balance */}
            </Text>
          </Group>
        </Paper>
      </Card>
      <Button fullWidth>Confirm</Button>
    </Flex>
  );
}
