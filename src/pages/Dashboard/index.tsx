import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import { _getQuestions } from "utils/_DATA";
import { useSelector } from "react-redux";
import { RootState } from "services/redux/configure_store";
import { IQuestion } from "type";
import QuestionCard from "./QuestionCard";

const Dashboard = () => {
  // const dispatch: Dispatch<any> = useDispatch();
  const questions: Record<string, IQuestion> | null = useSelector(
    (state: RootState) => state.questions.all,
  );
  const user: any = useSelector((state: RootState) => state.auth.user);
  const allQuestions: any = useSelector((state: RootState) => state.questions.all);

  const [answeredQuestion, setAnsweredQuestion] = useState<Array<IQuestion>>([]);
  const [unAnsweredQuestion, setUnAnsweredQuestion] = useState<Array<IQuestion>>([]);

  const getQuestions = async () => {
    const answeredQ: Array<IQuestion> = [];
    const unAnsweredQ: Array<IQuestion> = [];
    Object.values(allQuestions).forEach((question: any) => {
      const userVotedOptionOne = question.optionOne.votes.includes(user.id);
      const userVotedOptionTwo = question.optionTwo.votes.includes(user.id);
      if (userVotedOptionOne || userVotedOptionTwo) {
        return answeredQ.push(question);
      }
      unAnsweredQ.push(question);
    });
    setAnsweredQuestion(answeredQ);
    setUnAnsweredQuestion(unAnsweredQ);
  };

  useEffect(() => {
    getQuestions();
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
              {questions === null || unAnsweredQuestion.length === 0 ? (
                <Box>No Questions</Box>
              ) : (
                unAnsweredQuestion.map((question: IQuestion) => (
                  <QuestionCard key={question.id} question={question} />
                ))
              )}
            </Stack>
          </TabPanel>

          <TabPanel border="1px solid rgba(34,36,38,.15)">
            <Stack spacing="20px">
              {answeredQuestion.map((question: IQuestion) => (
                <QuestionCard key={question.id} question={question} hasAnswered />
              ))}
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Dashboard;
