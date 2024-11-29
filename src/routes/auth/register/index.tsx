import { z } from "zod";
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
// import { z } from "zod";
import { SupportCard } from "../../../components/ui/SupportCard";
import { username_ic, lock_ic, call_ic } from "../../../assets/icons";

const formSchema = z.object({
  username: z
    .string()
    .refine((value) => value.length >= 3, {
      message: "Username must be at least 3 characters long", // Error for length less than 3
    })
    .refine((value) => value.trim().length > 0, {
      message: "Please enter a user name", // Error for empty string
    }),

  mobileNum: z
    .string()
    .refine((value) => /^[1-9][0-9]{9}$/.test(value), {
      message: "Please enter a valid 10-digit mobile number",
    })
    .refine((value) => value.trim().length > 0, {
      message: "Please enter a mobile number", // Error for empty string
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

export const Register = () => {
  const form = useForm({
    validate: zodResolver(formSchema),
    initialValues: {
      username: "",
      mobileNum: "",
      mpin: "",
    },
  });
  return (
    <Flex pt={42} bg={"#F8F9FA"} px={18} h={"100vh"} direction={"column"}>
      <Title mb={14}>Register</Title>
      <Text size="md" mb={14}>
        Embark on a new journey. Create your account and explore.
      </Text>
      <form
        onSubmit={form.onSubmit((value) => {
          console.log(value);
        })}
        style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <TextInput
          size="md"
          key={form.key("username")}
          {...form.getInputProps("username")}
          label="Username"
          placeholder="Enter User Name"
          leftSection={username_ic}
          maxLength={10}
          mb={14}
        />
        <TextInput
          size="md"
          key={form.key("mobileNum")}
          {...form.getInputProps("mobileNum")}
          label="Mobile Number"
          placeholder="Enter Mobile Number"
          maxLength={10}
          leftSection={call_ic}
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
          leftSection={lock_ic}
          inputMode="numeric"
        />
        <SupportCard></SupportCard>
        <Box mt={"auto"}>
          <Button type="submit" w={"100%"}>
            Sign Up
          </Button>
        </Box>
      </form>
      {/* "Sign Up" Text and Link */}
      <Text size="md" my={14} ta={"center"}>
        Already Have an account?
        <Anchor
          href="/" // TODO: LINK TO SIGN UP ROUTE
          underline="hover"
          mx={4}
        >
          Log in
        </Anchor>
      </Text>
    </Flex>
  );
};
