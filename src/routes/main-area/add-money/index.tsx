import { Card, Center, Flex, Text, Image, TextInput, Box } from "@mantine/core";
import addWallet from "../../../assets/images/quick-feature/add-wallet.png";
import { useState } from "react";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";

const formSchema = z.object({
  amount: z.string().min(1, { message: "Please enter a amount" }),
});

export const AddMoney = () => {
  const form = useForm({
    validate: zodResolver(formSchema),
    initialValues: {
      amount: "",
    },
  });

  const [inputValue, setInputValue] = useState("");
  const handleDivClick = (amount: string) => {
    setInputValue(amount);
  };
  return (
    <>
      <Flex h={64} gap={30} align={"center"} px={14} bg={"cyan"}>
        <a href="/">
          <svg
            viewBox="0 0 24 24"
            id="bxs-chevron-left"
            width={36}
            height={36}
            style={{ paddingTop: 8 }}
          >
            <path
              fill="white"
              d="M13.939 4.939L6.879 12l7.06 7.061l2.122-2.122L11.121 12l4.94-4.939z"
            ></path>
          </svg>
        </a>
        <Text c="white" size="24">
          Add Fund
        </Text>
      </Flex>
      <Text c="white" bg={"cyan"} ta={"center"} py={4}>
        Pay by UPI ID
      </Text>
      <Flex justify={"center"}>
        <Card shadow="xl" w={"96%"}>
          <Center pb={42}>
            <Image
              src={addWallet}
              alt="add money"
              w={36}
              h={36} // other wise image not rendering in firefox
            />
            <Text px={8} ta={"center"}>
              {5 /*amount */}
            </Text>
          </Center>
          <form>
            {/*TODO: HERE WE HAVE TO ADD PAYMENT MODE */}
            <TextInput
              label="Enter Amount"
              key={form.key("amount")}
              {...form.getInputProps("amount")}
              maxLength={8}
              placeholder="Amount to add"
              inputMode="numeric"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            ></TextInput>
          </form>
          <Flex
            gap="md"
            mt="sm"
            px={8}
            wrap={"wrap"}
            justify={"center"}
            align={"center"}
          >
            {["500", "1000", "2000", "4000", "5000", "7000"].map((amount) => (
              <Box
                key={amount}
                onClick={() => handleDivClick(amount)}
                px="md"
                py="sm"
                bd="1px solid grey"
                w={80}
              >
                ₹{amount}
              </Box>
            ))}
          </Flex>
        </Card>
      </Flex>
    </>
  );
};
