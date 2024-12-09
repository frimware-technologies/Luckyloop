import {
  setting_ic,
  deposit_ic,
  withraw_ic,
  game_rate_ic,
  notification_ic,
  logout_ic,
  transaction_ic,
  bid_history_ic,
  video_ic,
  share_ic,
  home_ic,
  win_ic,
} from "../../assets/icons";
import { LogoutModel } from "../home/LogoutModel";
import { GameRate } from "../DrawerContent/GameRate";
import { useNavigate } from "react-router";
import { Flex, Button, Drawer, Text, Avatar, Modal } from "@mantine/core";
import { useState } from "react";

export const Menu = () => {
  const navigate = useNavigate();
  const [OpenGameRate, setOpenGameRate] = useState(false);
  const [OpenHowToPlay, setOpenHowToPlay] = useState(false);
  const [openlogoutModel, setOpenLogoutModel] = useState(false);

  const buttons = [
    { label: "Home", icon: home_ic },
    {
      label: "How to Play",
      icon: video_ic,
      onClick: () => setOpenHowToPlay(true),
    },
    {
      label: "Deposit Funds",
      icon: deposit_ic,
      onClick: () => navigate("/add-money"),
    },
    {
      label: "Withdraw Funds",
      icon: withraw_ic,
      onClick: () => navigate("/withdraw-money"),
    },
    {
      label: "Game Rates",
      icon: game_rate_ic,
      onClick: () => setOpenGameRate(true),
    },
    {
      label: "Transaction History",
      icon: transaction_ic,
      onclick: () => navigate("/transaction-history"),
    },
    {
      label: "Bid History",
      icon: bid_history_ic,
      onclick: () => navigate("/bid-history"),
    },
    {
      label: "Bid Win History",
      icon: win_ic,
      onclick: () => navigate("bid-win-history"),
    },
    {
      label: "Notification",
      icon: notification_ic,
      onclick: () => navigate("/notification"),
    },
    { label: "Settings", icon: setting_ic },
    { label: "Share Application", icon: share_ic },
    {
      label: "Logout",
      icon: logout_ic,
      onClick: () => {
        setOpenLogoutModel(true);
      },
    },
  ];
  return (
    //TODO: WE HAVE TO MODIFY HREF LINK IN FUTURE
    <Flex w={"100%"} direction={"column"} gap={12} bd={"black"}>
      <Flex h={86} gap={4} align={"center"} bg={"cyan"}>
        <a href="/profile">
          <Avatar
            variant="transparent"
            color="white"
            radius="xl"
            size="xl"
            src=""
          />
        </a>
        <Flex direction={"column"}>
          <Text c="white" size="sm">
            Anuj
          </Text>
          <Text c="white" size="sm">
            8503095408
          </Text>
        </Flex>
      </Flex>

      {buttons.map((button, index) => (
        <Button
          justify="start"
          leftSection={button.icon}
          size="md"
          variant="default"
          onClick={button.onClick}
          key={index}
        >
          {button.label}
        </Button>
      ))}
      <Drawer
        opened={OpenGameRate}
        onClose={() => setOpenGameRate(false)}
        title="Game Rates"
      >
        <GameRate></GameRate>
      </Drawer>
      <Drawer
        opened={OpenHowToPlay}
        onClose={() => setOpenHowToPlay(false)}
        title="How To Play"
        fz={22}
      >
        {" The real name of this game is Satta Matka"}
      </Drawer>
      <Modal
        opened={openlogoutModel}
        onClose={() => setOpenLogoutModel(false)}
        centered
        withCloseButton={false}
      >
        <LogoutModel setOpenLogoutModel={setOpenLogoutModel}></LogoutModel>
      </Modal>
    </Flex>
  );
};
