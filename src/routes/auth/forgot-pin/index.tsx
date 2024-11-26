import {
  Title,
  Text,
  Box,
  Button,
  Anchor,
  Flex,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { call_ic } from "../../../assets/icons";

const formSchema = z.object({
  mobileNum: z
    .string()
    .refine((value) => /^[1-9][0-9]{9}$/.test(value), {
      message: "Please enter a valid 10-digit mobile number",
    })
    .refine((value) => value.trim().length > 0, {
      message: "Please enter mobile number", // Error for empty string
    }),
});

export const ForgetPin = () => {
  const form = useForm({
    validate: zodResolver(formSchema),
    initialValues: {
      mobileNum: "",
    },
  });
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
          Forget Pin?
        </Text>
      </Flex>
      <Flex px={18} pt={42} direction={"column"}>
        <Title mb={14}>Set new MPin</Title>
        <Text size="md" mb={14}>
          Please enter your 10 digit mobile number to get otp.
        </Text>
        <form
          onSubmit={form.onSubmit((value) => {
            console.log(value);
          })}
        >
          <TextInput
            size="md"
            key={form.key("mobileNum")}
            {...form.getInputProps("mobileNum")} //TODO: ADD LEFT SECTION
            label="Mobile Number"
            leftSection={call_ic}
            placeholder="Enter Mobile Number"
            maxLength={10}
            mb={32}
            inputMode="numeric"
          />
          <Box>
            <Button type="submit" w={"100%"}>
              Send OTP
            </Button>
          </Box>
        </form>
        {/* "Sign Up" Text and Link */}
        <Text size="md" my={14} ta={"center"}>
          Remember Password?
          <Anchor
            href="/" // TODO: LINK TO SIGN UP ROUTE
            underline="hover"
            mx={4}
          >
            Login
          </Anchor>
        </Text>
      </Flex>
    </>
  );
};
