import { Button, Card, TextInput, Image } from "@mantine/core";
import { lock_ic, username_ic } from "@/assets/icons";
import { SharedHeader } from "@/components/ui/SharedHeader";
import wallet from "@/assets/images/quick-feature/add-wallet.png";
import { useEffect, useState } from "react";
export const Profile = () => {
  const [userPhone, setPhone] = useState<string | null>("");
  useEffect(() => {
    setPhone(localStorage.getItem("item"));
  }, []);

  return (
    <>
      <SharedHeader title={"Profile"} />
      <Card
        style={{ overflow: "visible" }}
        shadow="xl"
        w={"92%"}
        my={80}
        py={80}
        mx={"auto"}
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

        <TextInput label="User Name" leftSection={username_ic}></TextInput>
        <TextInput label="Email Id" leftSection={lock_ic}></TextInput>

        <TextInput
          label="Mobile Number"
          value={`${userPhone}`}
          leftSection={username_ic}
          disabled
        ></TextInput>
        <Button type="submit" my={14}>
          Update
        </Button>
      </Card>
    </>
  );
};
