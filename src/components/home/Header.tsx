import { useDisclosure } from "@mantine/hooks";
import { Flex, Drawer, Button, Center, Text, Image } from "@mantine/core";
import { menu_ic } from "../../assets/icons";
import addWallet from "../../assets/images/quick-feature/add-wallet.png";
import { Menu } from "../Menu";

export const Header = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Flex
        px={18}
        h={64}
        align={"center"}
        bg={"#48B0C0"}
        justify={"space-between"}
      >
        <Button onClick={open} bg={"transparent"} p={0}>
          {menu_ic}
        </Button>
        <Center>
          <Image
            src={addWallet}
            alt="add money"
            w={36}
            h={36} // other wise image not rendering in firefox
          />
          <Text px={8} c={"white"} ta={"center"}>
            {5 /*amount */}
          </Text>
        </Center>
      </Flex>
      <Drawer opened={opened} onClose={close} title="Menu" size={"80%"}>
        <Menu />
      </Drawer>
    </>
  );
};
