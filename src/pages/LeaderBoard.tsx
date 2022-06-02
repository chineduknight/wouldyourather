import { Box, Divider, Stack, Flex, Text } from "@chakra-ui/react";
import QuestionWrapper from "components/QuestionWrapper";
import React from "react";

const LeaderBoard = () => {
  return (
    <Stack mt="4" spacing="20px">
      <LeaderCard />
      <LeaderCard />
      <LeaderCard />
    </Stack>
  );
};

export default LeaderBoard;

const LeaderCard = () => {
  return (
    <QuestionWrapper>
      <Flex>
        <Box w="100%">
          <Text fontWeight={700} fontSize="20px">
            Brittini
          </Text>
          <Flex w="100%" mt="4">
            <Box w="100%">
              <Flex justifyContent="space-between">
                <Text>Answered questions</Text>
                <Text>4</Text>
              </Flex>
              <Divider my="2" />
              <Flex justifyContent="space-between">
                <Text>Created questions</Text>
                <Text>4</Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          border="1px solid rgba(34,36,38,.15)"
          boxShadow="0 1px 2px 0 rgb(34 36 38 / 15%)"
          borderRadius="0.28571429rem"
          ml="6"
        >
          <Text fontWeight="bold" bg="#f3f4f5" p="0.7rem 1rem">
            Score
          </Text>
          <Flex
            my="3"
            borderRadius="50%"
            backgroundColor="#49a950"
            color="#fff"
            justifyContent="center"
            alignItems="center"
            height="40px"
            width="40px"
            textAlign="center"
            fontWeight="700"
            fontSize="19px"
          >
            6
          </Flex>
        </Flex>
      </Flex>
    </QuestionWrapper>
  );
};
