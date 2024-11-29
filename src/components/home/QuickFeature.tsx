import addWallet from "../../assets/images/quick-feature/add-wallet.png";
import result from "../../assets/images/quick-feature/online-analytical.png";
import coustomerCare from "../../assets/images/quick-feature/customer-service.png";
import withdraw from "../../assets/images/quick-feature/cash-withdrawal.png";
import { Flex, Card, Image, Text } from "@mantine/core";
import { Link } from "react-router";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import { SupportCard } from "../ui/SupportCard";

export const QuickFeatureBar = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Flex py={4} justify={"space-around"} align={"center"}>
      <Link to="/add-money" style={{ textDecoration: "none" }}>
        <Card
          px={16}
          py={8}
          shadow="md"
          w={80}
          radius="md"
          withBorder
          style={{
            alignItems: "center",
          }}
        >
          <Image src={addWallet} alt="withdraw money" w={36} h={36} />
          <Text ta={"center"} size="xs">
            Add money
          </Text>
        </Card>
      </Link>{" "}
      <Card
        style={{
          alignItems: "center",
        }}
        px={16}
        py={8}
        shadow="md"
        w={80}
        radius="md"
        withBorder
      >
        <Image
          src={withdraw}
          alt="withdraw money"
          w={36}
          h={36} // other wise image not rendering in firefox
        />
        <Text ta={"center"} size="xs">
          Withdraw Money
        </Text>
      </Card>
      <Card
        px={16}
        onClick={open}
        py={8}
        shadow="md"
        radius="md"
        w={80}
        withBorder
        style={{
          alignItems: "center",
        }}
      >
        <Image
          src={coustomerCare}
          alt="withdraw money"
          w={36}
          h={36}
          style={{
            alignItems: "center",
          }} // other wise image not rendering in firefox
        />
        <Text ta={"center"} size="xs">
          Contact Us
        </Text>
      </Card>
      <Drawer
        offset={8}
        radius="md"
        opened={opened}
        onClose={close}
        position="bottom"
      >
        <SupportCard />
      </Drawer>
      <Card
        px={16}
        py={8}
        shadow="md"
        radius="md"
        w={80}
        withBorder
        style={{
          alignItems: "center",
        }}
      >
        <Image
          src={result}
          alt="withdraw money"
          w={36}
          h={36} // other wise image not rendering in firefox
        />
        <Text ta={"center"} size="xs">
          Live Result
        </Text>
      </Card>
    </Flex>
  );
};
