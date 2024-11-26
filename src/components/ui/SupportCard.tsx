import { Card, Text, Grid, Image } from "@mantine/core";
import whatsapp from "../../assets/images/support/whatsapp.png";
import call from "../../assets/images/support/call.png";
import telegram from "../../assets/images/support/telegram.png";
export const SupportCard = () => {
  return (
    <Card shadow="md" py={22} my={14}>
      <Text size="md" mb={14} ta={"center"}>
        Need Help? contact Us
      </Text>
      <Grid justify={"space-around"}>
        <Image
          src={whatsapp}
          alt="whatsapp support"
          radius="100%"
          style={{ width: "56px", height: "56px" }} // other wise image not rendering in firefox
        />
        <Image
          src={call}
          alt="whatsapp support"
          radius="100%"
          style={{ width: "56px", height: "56px" }} // other wise image not rendering in firefox
        />
        <Image
          src={telegram}
          alt="whatsapp support"
          radius="100%"
          style={{ width: "56px", height: "56px" }} // other wise image not rendering in firefox
        />
      </Grid>
    </Card>
  );
};
