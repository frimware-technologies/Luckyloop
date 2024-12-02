import { z } from "zod";
import {
  Title,
  Text,
  Box,
  Button,
  Anchor,
  Flex,
  TextInput,
  Drawer,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { SupportCard } from "@/components/ui/SupportCard";
import { username_ic, lock_ic, call_ic } from "@/assets/icons";
import { useState } from "react";
import { VerifyOtp } from "../../../components/DrawerContent/VerifyOtp";

const RegisterSchema = z.object({
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
    .refine((value) => /^[6-9]\d{9}$/.test(value), {
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
type FormSchemaType = z.infer<typeof RegisterSchema>;

export const Register = () => {
  const [openOtpForm, setOpenOtpForm] = useState(false);
  const [number, setNumber] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    validate: zodResolver(RegisterSchema),
    initialValues: {
      username: "",
      mobileNum: "",
      mpin: "",
    },
  });

  const handlRegistration = async (value: FormSchemaType) => {
    setIsLoading(true);
    // const backend_url = import.meta.env.BACKEND_URL;
    const response = await fetch(`http://127.0.0.1:8787/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        name: value.username,
        phone: value.mobileNum,
        mpin: value.mpin,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: {
      error?: string;
      success?: string;
      userId?: string;
    } = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setErrMessage(`${data.error}`);
      return;
    }

    setOpenOtpForm((prev) => !prev);
    setNumber(value.mobileNum);
    setIsLoading(false);
    console.log(data);
  };

  return (
    <Flex pt={42} bg={"#F8F9FA"} px={18} h={"100vh"} direction={"column"}>
      <Title mb={14}>Register</Title>
      <Text size="md" mb={14}>
        Embark on a new journey. Create your account and explore.
      </Text>
      <form
        onSubmit={form.onSubmit((value) => {
          handlRegistration(value);
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
        {errMessage && (
          <Text ta={"center"} c="red">
            {errMessage}
          </Text>
        )}
        <Box mt={"auto"}>
          <Button type="submit" w={"100%"} loading={isLoading}>
            Sign Up
          </Button>
        </Box>
      </form>
      {/* "Sign Up" Text and Link */}
      <Text size="md" my={14} ta={"center"}>
        Already Have an account?
        <Anchor
          href="/login" // TODO: LINK TO SIGN UP ROUTE
          underline="hover"
          mx={4}
        >
          Log in
        </Anchor>
      </Text>
      <Drawer opened={openOtpForm} onClose={() => setOpenOtpForm(false)}>
        <VerifyOtp number={number}></VerifyOtp>
      </Drawer>
    </Flex>
  );
};
