import { Text, Card, Group, Flex } from "@mantine/core";
const rates = [
  { lable: "Single Digit", price: "10 ka 100" },
  { lable: "Jodi Digit", price: "10 ka 1000" },
  { lable: "Single Pana", price: "10 ka 1500" },
  { lable: "Double Pana", price: "10 ka 3000" },
  { lable: "Triple Pana", price: "10 ka 7000" },
  { lable: "Half Sangam", price: "10 ka 10,000" },
  { lable: "Full Sangam", price: "10 ka 1,00,000" },
];

export function GameRate() {
  return (
    <>
      <Group justify="center">
        <Text
          ta={"center"}
          fz={22}
          fw={800}
          w={"60%"}
          td={"underline"}
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
          my={32}
        >
          We Offer Best Rates in the Market
        </Text>
        <Card shadow="xl" w={"96%"} bg={"cyan.1"} ta={"center"}>
          <Text fz={22} my={8}>
            Main Game Win Ratio
          </Text>
          {rates.map((rate, index) => (
            <Flex key={index} justify={"space-between"}>
              <Text fz={18}>{rate.lable}</Text>
              <Text fz={18}>{rate.price}</Text>
            </Flex>
          ))}
        </Card>
      </Group>
    </>
  );
}
