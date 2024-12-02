import { lock_ic } from "@/assets/icons";
import { Flex, Text, Title, TextInput, Button } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useAuth } from "@/App";

const otpSchema = z.object({
  otp: z.string().min(4, { message: "Enter a 4 digit OTP" }),
});

export function VerifyOtp({ number }: { number: string }) {
  //pehli baar mein timing dikhana hai
  // resend otp click karne pr phir se timing start karni hai
  const [timer, setTimer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reStartTimer, setReTimer] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const { setIsAuthenticated } = useAuth();
  const form = useForm({
    validate: zodResolver(otpSchema),
    initialValues: {
      otp: "",
    },
  });
  const BACKEND_URL = import.meta.env.BACKEND_URL || "http://127.0.0.1:8787";

  async function handleOtpVerification(value: { otp: string }) {
    setIsLoading(true);
    const response = await fetch(`${BACKEND_URL}/auth/verify`, {
      method: "POST",
      credentials: "include", // This enables cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: number, otp: value.otp }),
    });
    const data = await response.json();
    if (!response.ok) {
      setErrMessage(data.error);
      setIsLoading(false);
      return;
    }
    console.log(data);
    localStorage.setItem("phone", number);
    setIsAuthenticated(true);
    setIsLoading(false);
  }

  async function handleResendOtp() {
    console.log("hello sonam .");
    setReTimer((prevState) => !prevState);
    const response = await fetch(`${BACKEND_URL}/auth/resend-otp`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: number, type: "register" }),
    });
    const data: { success: boolean; message?: string; error?: string } =
      await response.json();
    if (!response.ok) {
      setErrMessage(`${data.error}`);
      return;
    }
    setErrMessage(`${data.message}`);
    return;
  }

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

  return (
    <Flex direction={"column"}>
      {" "}
      <Title mb={14}>OTP verify</Title>
      <Text mb={14}>
        {`Enter the verification code we just sent on your mobile number.(+91 ${number})`}
      </Text>
      <form
        onSubmit={form.onSubmit((value) => {
          handleOtpVerification(value);
        })}
      >
        <TextInput
          label={"Verify OTP"}
          key={form.key("otp")}
          {...form.getInputProps("otp")}
          inputSize="4"
          inputMode="numeric"
          leftSection={lock_ic}
          maxLength={4}
          mb={14}
        ></TextInput>
        <Button loading={isLoading} my={14} w={"100%"} type="submit">
          {" "}
          Verify
        </Button>
      </form>
      {timer ? (
        <Text ta={"center"}>{`Resend OTP in
            ${timer}`}</Text>
      ) : (
        <Button variant="light" size="md" onClick={handleResendOtp}>
          Resend OTP
        </Button>
      )}
      {errMessage && (
        <Text c={"red"} mt={120} ta={"center"}>
          {errMessage}
        </Text>
      )}
    </Flex>
  );
}
