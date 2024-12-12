import { Flex, Card, Text, Switch } from "@mantine/core";
import { getStoreValue, setStoreValue } from "@/store";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";

export function Setting() {
  const [checked, setChecked] = useState<boolean>(false);

  // Use useEffect to fetch the initial value from the store
  useEffect(() => {
    const fetchNotificationSetting = async () => {
      const result: { notification: boolean } | undefined =
        await getStoreValue("setting");
      setChecked(result?.notification || false); // Default to false if result is undefined
    };

    fetchNotificationSetting();
  }, []); // Empty dependency array ensures this runs once on mount

  const setNotificationSetting = async (newChecked: boolean) => {
    await setStoreValue("setting", { notification: newChecked }); // Ensure the correct key matches "notification"
    notifications.show({
      message: "Operation successful!",
    });
  };

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
        Setting
      </Card>
      <Flex px={20} justify={"space-around"} align={"center"}>
        <Text w={"50%"} my={12} fz={22}>
          Result Notifications
        </Text>
        <Flex>
          <Switch
            checked={checked}
            onChange={(event) => {
              const newChecked = event.currentTarget.checked;
              setChecked(newChecked); // Update local state
              setNotificationSetting(newChecked); // Save to storage
            }}
            size="lg"
            onLabel="ON"
            offLabel="OFF"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
