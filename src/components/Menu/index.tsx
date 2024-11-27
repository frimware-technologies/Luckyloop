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
import { NavLink, Flex } from "@mantine/core";
export const Menu = () => {
  return (
    //TODO: WE HAVE TO MODIFY HREF LINK IN FUTURE
    <Flex w={"80%"} direction={"column"} gap={12} bd={"black"}>
      <NavLink href="/" label="Home" leftSection={home_ic} active />
      <NavLink
        h={56}
        href="/how-to-play"
        label="How to Play"
        leftSection={video_ic}
        active
      />
      <NavLink
        h={56}
        href="/deposit"
        label="Deposit Funds"
        leftSection={deposit_ic}
        active
      />
      <NavLink
        h={56}
        href="/withraw"
        label="Withdraw Funds"
        leftSection={withraw_ic}
        active
      />
      <NavLink
        h={56}
        href="/game-rates"
        label="Game Rates"
        leftSection={game_rate_ic}
        active
      />
      <NavLink
        h={56}
        href="/transaction-history"
        label="Transaction History"
        leftSection={transaction_ic}
        active
      />
      <NavLink
        h={56}
        href="/bid-history"
        label="Bid History"
        leftSection={bid_history_ic}
        active
      />
      <NavLink
        h={56}
        href="/bid-win-history"
        label="Bid win History"
        leftSection={win_ic}
        active
      />
      <NavLink
        h={56}
        href="/bid-history"
        label="Notification"
        leftSection={notification_ic}
        active
      />
      <NavLink
        h={56}
        href="/settings"
        label="Settings"
        leftSection={setting_ic}
        active
      />
      <NavLink
        h={56}
        href="/bid-history"
        label="Share Application"
        leftSection={share_ic}
        active
      />
      <NavLink
        h={56}
        href="/register"
        label="Logout"
        leftSection={logout_ic}
        active
      />
    </Flex>
  );
};
