import { Card, Flex, Text, Image, Anchor } from "@mantine/core";
import Chart from "@/assets/images/GameCard/chart.png";
import { game_video_ic, pause_ic } from "@/assets/icons";
import { useNavigate } from "react-router";
import { notifications } from "@mantine/notifications";

interface GameCardProps {
  title: string;
  chartLink: string;
  open: string;
  close: string;
  digit: string;
}

export const GameCard = ({
  title,
  chartLink,
  open,
  close,
  digit,
}: GameCardProps) => {
  const navigate = useNavigate();
  const now = new Date();
  const [endHours, endMins, endPeriod] =
    close.match(/(\d+):(\d+)\s*(AM|PM)/)?.slice(1) ?? [];

  const end = new Date();
  end.setHours(
    endPeriod === "AM"
      ? parseInt(endHours) % 12
      : (parseInt(endHours) % 12) + 12,
    parseInt(endMins),
    0,
    0,
  );

  const handleCardClick = () => {
    if (now >= end) {
      notifications.show({
        autoClose: 1000,
        title: "",
        message: "Market is close!",
        w: "100%",
        position: "top-center",
        color: "red",
      });
      return;
    }

    navigate(`/games/${title.split(" ").join("-").toLocaleLowerCase()}`);
  };

  return (
    <Card
      withBorder={true}
      bd={"2px solid black"}
      radius={10}
      shadow="xl"
      px={8}
      py={4}
      onClick={handleCardClick}
    >
      <Flex justify={"space-between"}>
        <Text fw={500}>{`Open ${open}`}</Text>
        <Text fw={500}>{`Close ${close}`}</Text>
      </Flex>
      <Text fz={18} fw={500} ta={"center"} c={"#4d0000"}>
        {" "}
        {`${title}`}
      </Text>
      <Flex px={2} justify={"space-between"} align={"center"} my={2}>
        <Anchor
          href={`${chartLink}`}
          onClick={(e) => e.stopPropagation()}
          style={{ textDecoration: "none" }}
        >
          <Image src={Chart} h={42} w={42} alt="No way!" />
        </Anchor>
        <Text>{`${digit}`} </Text>

        {now <= end ? game_video_ic : pause_ic}
      </Flex>
      <Text c={`${now <= end ? "green" : "red"}`} fw={500} ta={"center"}>
        {`${now <= end ? "Market is Running" : "Market is Closed"} `}
      </Text>
    </Card>
  );
};
