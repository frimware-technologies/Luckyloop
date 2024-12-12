import { Text, Flex, Card, Button } from "@mantine/core";
import { useAuth } from "@/App";

export const LogoutModel = ({
  setOpenLogoutModel,
}: {
  setOpenLogoutModel: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setIsAuthenticated } = useAuth();
  return (
    <Flex p={0} pb={22} direction="column">
      <Card
        bg={"cyan"}
        w={"100%"}
        c={"white"}
        fz={"xl"}
        ta={"center"}
        style={{ width: "100%" }}
      >
        Logout
      </Card>
      <Text my={14} ta={"center"}>
        Are you sure you want to quit
      </Text>
      <Flex direction="row" justify={"space-around"}>
        <Button
          variant="outline"
          h={32}
          size="md"
          onClick={() => setOpenLogoutModel((prev) => !prev)}
        >
          No
        </Button>
        <Button
          variant=""
          h={32}
          size="md"
          onClick={() => {
            setIsAuthenticated(false);
            localStorage.clear();
          }}
        >
          Yes
        </Button>
      </Flex>
    </Flex>
  );
};
