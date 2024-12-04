import { lock_ic } from "@/assets/icons";
import { nextFetch } from "@/libs/nextFetch";
import {
  Flex,
  Title,
  Text,
  TextInput,
  Box,
  Button,
  Center,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";

const MpinOtpVerificationSchema = z.object({
  otp: z.string().min(4, { message: "Enter 4 digit OTP" }).max(4),
  newMpin: z.string().min(4, { message: "Set a 4 digit MPIN" }).max(4),
});

export function MpinOtpVerification({ number }: { number: string }) {
  const [errMessage, setErrMessage] = useState("");
  const [timer, setTimer] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [reStartTimer, setReTimer] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let timeForResendOtp = 5;
    const interval = setInterval(() => {
      if (timeForResendOtp) {
        timeForResendOtp -= 1;
        setTimer(
          `${Math.floor(timeForResendOtp / 60)}:${String(timeForResendOtp % 60).padStart(2, "0")}`,
        );
      } else {
        clearInterval(interval);
        setTimer("");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [reStartTimer]);

  const form = useForm({
    validate: zodResolver(MpinOtpVerificationSchema),
    initialValues: {
      otp: "",
      newMpin: "",
    },
  });

  const handleMpinOtpValidation = async (value: {
    otp: string;
    newMpin: string;
  }) => {
    setLoading(true);
    const response = await nextFetch("/auth/reset-mpin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: number,
        otp: value.otp,
        new_mpin: value.newMpin,
      }),
    });
    const data: { error?: string; token?: string; success?: boolean } =
      await response.json();
    if (!response.ok) {
      setErrMessage(`${data.error}`);
      return setLoading(false);
    }
    localStorage.setItem("token", `${data.token}`);
    localStorage.setItem("phone", number);
    setTimeout(() => console.log("reset"), 500);
    setLoading(false);
    navigate("/");
  };

  async function handleResendOtp() {
    setReTimer((prevState) => !prevState);
    const response = await nextFetch("/auth/resend-otp", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: number, type: "forget" }),
    });
    const data: {
      success: boolean;
      message?: string;
      error?: string;
      token?: string;
    } = await response.json();
    if (!response.ok) {
      setErrMessage(`${data.error}`);
      return;
    }
    setErrMessage(`${data.message}`);
    return;
  }
  return (
    <Flex py={42} h={"80%"} bg={"#F8F9FA"} px={18} direction={"column"}>
      <Title mb={14}>MPIN Verification</Title>
      <Text size="md" c={"grey"} mb={14}>
        {`Enter the Verification code we just sent on your mobile number ${number}`}
      </Text>
      <form
        onSubmit={form.onSubmit((value) => {
          handleMpinOtpValidation(value);
        })}
        style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <TextInput
          size="md"
          key={form.key("otp")}
          {...form.getInputProps("otp")}
          leftSection={lock_ic}
          label="Verify OTP"
          placeholder="Enter OTP"
          maxLength={4}
          mb={14}
          inputMode="numeric"
        />
        <TextInput
          label="New MPIN"
          key={form.key("newMpin")}
          {...form.getInputProps("newMpin")}
          placeholder="Enter new MPIN"
          size="md"
          leftSection={lock_ic}
          maxLength={4}
          mb={14}
          inputMode="numeric"
        />
        <Text ta={"center"} c="red">
          {errMessage}
        </Text>
        <Center h={80}>
          {timer ? (
            <Text ta={"center"}>{`Resend OTP in
              ${timer}`}</Text>
          ) : (
            <Button
              c={"Black"}
              bg={"transparent"}
              size="md"
              onClick={handleResendOtp}
            >
              Resend OTP
            </Button>
          )}
        </Center>
        <Box mt={"auto"}>
          <Button type="submit" loading={isLoading} w={"100%"}>
            Verify
          </Button>
        </Box>
      </form>
      {/* "Sign Up" Text and Link */}
    </Flex>
  );
}
