import { Text, Flex, Card, Button } from "@mantine/core";

export const LogoutModel = ({
  setOpenLogoutModel,
}: {
  setOpenLogoutModel: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Flex direction="column" py={14}>
      <Card bg={"cyan"} c={"white"} fz={"xl"} ta={"center"}>
        Logout
      </Card>
      <Text my={14} ta={"center"}>
        Are you sure you want to quit
      </Text>
      <Flex direction="row" justify={"space-around"}>
        <Button
          variant="outline"
          h={32}
          size="xl"
          onClick={() => setOpenLogoutModel((prev) => !prev)}
        >
          No
        </Button>
        <Button
          variant=""
          h={32}
          size="xl"
          onClick={() => localStorage.clear()}
        >
          Yes
        </Button>
      </Flex>
    </Flex>
  );
};
