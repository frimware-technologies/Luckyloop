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
import { SupportCard } from "../../../components/ui/SupportCard";

const formSchema = z.object({
  mobileNum: z
    .string()
    .refine((value) => /^[1-9][0-9]{9}$/.test(value), {
      message: "Please enter a valid 10-digit mobile number",
    })
    .refine((value) => value.trim().length > 0, {
      message: "Please enter mobile number", // Error for empty string
    }),
  mpin: z
    .string()
    .refine((value) => /^\d{4}$/.test(value), {
      message: "MPIN must be 4 digits",
    })
    .refine((value) => value.trim().length > 0, {
      message: "Please enter MPIN",
    }),
});

export const Login = () => {
  const form = useForm({
    validate: zodResolver(formSchema),
    initialValues: {
      mobileNum: "",
      mpin: "",
    },
  });
  return (
    <Flex pt={42} px={18} h={"100vh"} direction={"column"}>
      <Title mb={14}>Login</Title>
      <Text size="md" mb={14}>
        Unlock your potential. Log in to explore all the features.
      </Text>
      <form
        onSubmit={form.onSubmit((value) => {
          console.log(value);
        })}
        style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <TextInput
          size="md"
          key={form.key("mobileNum")}
          {...form.getInputProps("mobileNum")}
          label="Mobile Number"
          placeholder="Enter Mobile Number"
          maxLength={10}
          mb={14}
          inputMode="numeric"
        />
        <TextInput
          label="MPIN"
          key={form.key("mpin")}
          {...form.getInputProps("mpin")}
          placeholder="Enter MPIN"
          size="md"
          maxLength={4}
          mb={14}
          inputMode="numeric"
        />

        <Anchor
          href="https://mantine.dev/" // TODO: LINK TO FORGET PIN ROUTE
          underline="hover"
          display={"block"}
          ta={"end"}
        >
          Forgot pin?
        </Anchor>
        <SupportCard></SupportCard>
        <Box mt={"auto"}>
          <Button type="submit" w={"100%"}>
            Sign In
          </Button>
        </Box>
      </form>
      {/* "Sign Up" Text and Link */}
      <Text size="md" my={14} ta={"center"}>
        Don't have an account?
        <Anchor
          href="/register" // TODO: LINK TO SIGN UP ROUTE
          underline="hover"
          mx={4}
        >
          Sign Up
        </Anchor>
      </Text>
    </Flex>
  );
};
