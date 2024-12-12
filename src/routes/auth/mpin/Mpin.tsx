import {
  Button,
  Card,
  Flex,
  Image,
  Text,
  PinInput,
  Anchor,
  Container,
} from "@mantine/core";
import wallet from "@/assets/images/quick-feature/add-wallet.png";
import { SupportCard } from "@/components/ui/SupportCard";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { nextFetch } from "@/libs/nextFetch";
import { useAuth } from "@/App";
import { useState } from "react";
import { setStoreValue } from "@/store";

const mpinSchema = z.object({
  mpin: z.string().min(4, { message: "Enter 4 digit MPIN" }).max(4),
});

export function Mpin() {
  const { setIsAuthenticated } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const form = useForm({
    validate: zodResolver(mpinSchema),
    initialValues: {
      mpin: "",
    },
  });

  const verifyMpin = async (value: { mpin: string }) => {
    setLoading(true);
    const phone = localStorage.getItem("phone");
    const response = await nextFetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: phone, mpin: value.mpin }),
    });
    const data: { error?: string; balance: number } = await response.json();
    if (!response.ok) {
      setErrMessage(`${data.error}`);
      return setLoading(false);
    }
    setIsAuthenticated(true);
    await setStoreValue("balance", data.balance);
    return setLoading(false);
  };

  return (
    <Flex direction={"column"} px={18}>
      <form
        onSubmit={form.onSubmit((value) => {
          verifyMpin(value);
        })}
      >
        <Card
          style={{ overflow: "visible" }}
          shadow="xl"
          mt={80}
          pt={60}
          pb={40}
          pos={"relative"}
          bg={"cyan.3"}
        >
          <Image
            src={wallet}
            w={"64px"}
            h={"64px"}
            pos={"absolute"}
            top={"-32px"}
            left={"50%"}
            style={{
              transform: "translate(-32px, 0px)",
            }}
          ></Image>

          <Text ta={"center"} mb={14} fz={24}>
            Kalyan 555
          </Text>

          <PinInput
            key={form.key("mpin")}
            {...form.getInputProps("mpin")}
            mx={"auto"}
            size="md"
          />
          <Button type="submit" loading={isLoading} mt={36}>
            Enter
          </Button>

          <Text my={4} fz={12} ta={"center"}>
            By clicking, I accept the <Anchor fz={12}>Privacy Policy</Anchor>
          </Text>
          {/*TODO:ADD LINK TO PRIVACY PAGE */}
        </Card>
        <Flex my={14}>
          <Container>
            <Text fz={12} ta={"center"}>
              Use another account?{" "}
            </Text>{" "}
            <Anchor href="/login" fz={12}>
              Sing in
            </Anchor>
          </Container>
          <Container>
            <Text fz={12} ta={"center"}>
              Change MPIN?{" "}
            </Text>{" "}
            <Anchor href="/forgot-pin" fz={12}>
              Forgot MPIN
            </Anchor>
          </Container>
        </Flex>
        <SupportCard />
      </form>
      {errMessage && (
        <Text c={"red"} mt={120} ta={"center"}>
          {errMessage}
        </Text>
      )}
    </Flex>
  );
}
