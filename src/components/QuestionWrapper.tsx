import { Box, Flex, Avatar } from "@chakra-ui/react";
import React from "react";

type QuestionWrapperProps = {
  children: React.ReactNode;
  avatarUrl: string;
  author?: string;
};

const QuestionWrapper = (props: QuestionWrapperProps) => {
  const { author, children, avatarUrl } = props;
  return (
    <Box
      p="4"
      border="1px solid rgba(34,36,38,.15)"
      borderRadius="10px"
      boxShadow="0 1px 2px 0 rgb(34 36 38 / 15%)"
    >
      {author ? (
        <Box fontWeight={700} bg="gray.100" p="2" textTransform="capitalize">
          {author} asks:
        </Box>
      ) : null}
      <Flex alignItems="center" py="4">
        <Avatar w="100px" h="100px" src={avatarUrl} />
        <Box borderLeft="2px solid rgba(34,36,38,.15)" pl="4" ml="4" w="100%">
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default QuestionWrapper;
