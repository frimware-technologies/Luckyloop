import { Button, Card, TextInput, Image } from "@mantine/core";
import { lock_ic, username_ic } from "../../../assets/icons";
import { SharedHeader } from "../../../components/ui/SharedHeader";
import wallet from "../../../assets/images/quick-feature/add-wallet.png";
export const Profile = () => {
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
        <img
          src={wallet}
          width={"64px"}
          height={"64px"}
          style={{
            position: "absolute",
            top: "-32px",
            left: "50%",
            translate: "-32px 0px",
            zIndex: 10000,
          }}
        ></img>
        <TextInput label="User Name" leftSection={username_ic}></TextInput>
        <TextInput label="Email Id" leftSection={lock_ic}></TextInput>

        <TextInput
          label="Mobile Number"
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
