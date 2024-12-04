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
import { lock_ic, call_ic } from "../../../assets/icons";
import { useState } from "react";
import { useAuth } from "@/App";

const loginSchema = z.object({
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
  const { setIsAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const form = useForm({
    validate: zodResolver(loginSchema),
    initialValues: {
      mobileNum: "",
      mpin: "",
    },
  });
  const BACKEND_URL = import.meta.env.BACKEND_URL || "http://127.0.0.1:8787";
  type valueType = z.infer<typeof loginSchema>;
  const handleLogin = async (value: valueType) => {
    setIsLoading(true);
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: value.mobileNum, mpin: value.mpin }),
    });
    const data: { error?: string; token?: string } = await response.json();
    if (!response.ok) {
      setErrMessage(`${data.error}`);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    console.log(data);
    localStorage.setItem("phone", value.mobileNum);
    localStorage.setItem("token", `${data.token}`);
    //redirect to home page

    setIsAuthenticated(true);
  };

  return (
    <Flex pt={42} bg={"#F8F9FA"} px={18} h={"100vh"} direction={"column"}>
      <Title mb={14}>Login</Title>
      <Text size="md" mb={14}>
        Unlock your potential. Log in to explore all the features.
      </Text>
      <form
        onSubmit={form.onSubmit((value) => {
          handleLogin(value);
        })}
        style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <TextInput
          size="md"
          key={form.key("mobileNum")}
          {...form.getInputProps("mobileNum")}
          leftSection={call_ic}
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
          leftSection={lock_ic}
          maxLength={4}
          mb={14}
          inputMode="numeric"
        />

        <Anchor
          href="/forgot-pin" // TODO: LINK TO FORGET PIN ROUTE
          underline="hover"
          display={"block"}
          ta={"end"}
        >
          Forgot MPIN?
        </Anchor>
        <SupportCard></SupportCard>
        {errMessage && (
          <Text ta={"center"} c="red">
            {errMessage}
          </Text>
        )}
        <Box mt={"auto"}>
          <Button type="submit" loading={isLoading} w={"100%"}>
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
