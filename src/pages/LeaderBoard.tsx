import { Box, Divider, Stack, Flex, Text } from "@chakra-ui/react";
import { nanoid } from "@reduxjs/toolkit";
import QuestionWrapper from "components/QuestionWrapper";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "services/redux/configure_store";

const LeaderBoard = () => {
  const users = useSelector((state: RootState) => state.auth.users);
  const [leaderBoard, setLeaderBoard] = useState([]);

  const getTopUsers = () => {
    const leaderBoard: any = [];
    for (const key in users) {
      const user = users[key];
      const questions = user.questions.length;
      const answers = Object.keys(user.answers).length;
      const userInfo = {
        name: user.id,
        answers,
        questions,
        avatarUrl: user.avatarURL,
        total: answers + questions,
      };
      leaderBoard.push(userInfo);
    }
    setLeaderBoard(
      leaderBoard.sort((a, b) => {
        return b.total - a.total;
      }),
    );
  };
  useEffect(() => {
    getTopUsers();
  }, []);
  return (
    <Stack mt="4" spacing="20px">
      {leaderBoard.map((leader) => (
        <LeaderCard key={nanoid()} user={leader} />
      ))}
    </Stack>
  );
};

export default LeaderBoard;

const LeaderCard = ({ user }: any) => {
  return (
    <QuestionWrapper avatarUrl={user.avatarUrl}>
      <Flex>
        <Box w="100%">
          <Text fontWeight={700} fontSize="20px" textTransform="capitalize">
            {user.name}
          </Text>
          <Flex w="100%" mt="4">
            <Box w="100%">
              <Flex justifyContent="space-between">
                <Text>Answered questions</Text>
                <Text> {user.answers} </Text>
              </Flex>
              <Divider my="2" />
              <Flex justifyContent="space-between">
                <Text>Created questions</Text>
                <Text> {user.questions} </Text>
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
            {user.total}
          </Flex>
        </Flex>
      </Flex>
    </QuestionWrapper>
  );
};
