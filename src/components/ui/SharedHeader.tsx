import { Flex, Text } from "@mantine/core";

export function SharedHeader({ title }: { title: string }) {
  return (
    <Flex h={64} gap={30} align={"center"} px={14} bg={"cyan"}>
      <a href="/">
        <svg
          viewBox="0 0 24 24"
          id="bxs-chevron-left"
          width={36}
          height={36}
          style={{ paddingTop: 8 }}
        >
          <path
            fill="white"
            d="M13.939 4.939L6.879 12l7.06 7.061l2.122-2.122L11.121 12l4.94-4.939z"
          ></path>
        </svg>
      </a>
      <Text c="white" size="24">
        {title}
      </Text>
    </Flex>
  );
}
