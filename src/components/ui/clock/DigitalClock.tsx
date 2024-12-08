import { useState, useEffect } from "react";
import { Text } from "@mantine/core";
export function DigitalClock({
  color,
  fontSize,
}: {
  color: string;
  fontSize: string;
}) {
  const [time, setTime] = useState(getFormattedTime());
  function getFormattedTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const period = hours >= 12 ? "PM" : "AM";

    // Format hours in 12-hour format
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    // Add leading zeros to minutes and seconds
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
  }
  useEffect(() => {
    // Update time every second
    const intervalId = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Text c={color} fz={fontSize} fw={400}>
      {time}
    </Text>
  );
}
