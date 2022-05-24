import {
  Box,
  Tab,
  Flex,
  Avatar,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { _getQuestions } from "utils/_DATA";

const Dashboard = () => {
  const [questions, setQuestions] = useState<any>();
  console.log("questions:", questions);
  const getUsers = async () => {
    const getU: any = await _getQuestions();
    setQuestions(getU);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Box>
      <Tabs variant="enclosed" mt="8">
        <TabList>
          <Tab>Unanswered</Tab>
          <Tab>Answered</Tab>
        </TabList>
        <TabPanels>
          <TabPanel border="1px solid rgba(34,36,38,.15)">
            <Stack spacing="20px">
              <QuestionCard />
              <QuestionCard />
              <QuestionCard />
            </Stack>
          </TabPanel>

          <TabPanel border="1px solid rgba(34,36,38,.15)">
            <Stack spacing="20px">
              <QuestionCard />
              <QuestionCard />
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Dashboard;

const QuestionCard = () => {
  return (
    <Box
      p="4"
      border="1px solid rgba(34,36,38,.15)"
      borderRadius="10px"
      boxShadow="0 1px 2px 0 rgb(34 36 38 / 15%)"
    >
      <Box fontWeight={700} bg="gray.100" p="2">
        Joeylene asks:
      </Box>
      <Flex alignItems="center" py="4">
        <Avatar w="100px" h="100px" />
        <Box borderLeft="2px solid rgba(34,36,38,.15)" pl="4" ml="4" w="100%">
          <Text>Would you rather</Text>
          <Text mt="3" textAlign="center">
            Modi aut repellendus
          </Text>
          <Text textAlign="center">or...</Text>
          <Button mt="2" w="100%">
            Answer Poll
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
