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
import { z } from "zod";
import { call_ic } from "../../../assets/icons";
import { SharedHeader } from "../../../components/ui/SharedHeader";
import { useState } from "react";
import { MpinOtpVerification } from "@/components/DrawerContent/MpinOtpVerification";
import { nextFetch } from "@/libs/nextFetch";

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

export const ForgotPin = () => {
  const [openOtpForm, setOpenOtpForm] = useState(false);
  const [number, setNumber] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const form = useForm({
    validate: zodResolver(formSchema),
    initialValues: {
      mobileNum: "",
    },
  });

  const handleForgotPin = async (value: { mobileNum: string }) => {
    setLoading(true);
    const response = await nextFetch("/auth/forgot-mpin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: value.mobileNum }),
    });
    const data: { message?: string; error?: string } = await response.json();
    if (!response.ok) {
      setLoading(false);
      return setErrMessage(`${data.error}`);
    }
    setLoading(false);
    setNumber(value.mobileNum);
    setErrMessage(`${data.message}`);
    return setOpenOtpForm(true);
  };

  return (
    <Flex direction={"column"} bg={"#F8F9FA"} h={"100vh"}>
      <SharedHeader title="Forgot Pin?"></SharedHeader>
      <Flex px={18} pt={42} direction={"column"}>
        <Title mb={14}>Set new MPin</Title>
        <Text size="md" mb={14}>
          Please enter your 10 digit mobile number to get otp.
        </Text>
        <form
          onSubmit={form.onSubmit((value) => {
            handleForgotPin(value);
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
            <Button type="submit" loading={isLoading} w={"100%"}>
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
        <Drawer
          opened={openOtpForm}
          onClose={() => setOpenOtpForm(false)}
          lockScroll={true}
        >
          <MpinOtpVerification number={number} />
        </Drawer>

        <Text ta={"center"} c="red">
          {errMessage}
        </Text>
      </Flex>
    </Flex>
  );
};
