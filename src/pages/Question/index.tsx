/* eslint-disable camelcase */
import { Box, Button, Flex, Progress, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import QuestionWrapper from "components/QuestionWrapper";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "services/redux/configure_store";
import { IQuestion, IUser } from "type";
import { BsCheck } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { answerQuestion } from "services/redux/reducers/questions";
import { updateAllUsers, updateUserQuestion } from "services/redux/reducers/auth";
const Question = () => {
  const [value, setValue] = React.useState("-1");
  const questions: any = useSelector((state: RootState) => state.questions.all);
  const { question_id } = useParams<any>();
  const foundId = Object.keys(questions).find((question) => question === question_id);
  if (!foundId) return <Box>Page not found</Box>;
  const question: IQuestion = questions[foundId];
  const user = useSelector((state: RootState) => state.auth.user) as IUser;
  const users = useSelector((state: RootState) => state.auth.users) as Record<string, IUser>;
  const history = useNavigate();
  const userVotedOptionOne: boolean = question?.optionOne.votes.includes(user.id) || false;
  const userVotedOptionTwo: boolean = question?.optionTwo.votes.includes(user.id) || false;
  const dispatch = useDispatch();
  const hasAnswered = userVotedOptionOne || userVotedOptionTwo;
  if (!question) return null;
  const totalQuestions = question.optionOne.votes.length + question.optionTwo.votes.length;
  const q1Value = question.optionOne.votes.length / totalQuestions;
  const q2Value = question.optionTwo.votes.length / totalQuestions;
  const q1Percentage = (Math.round(q1Value * 100) / 100) * 100;
  const q2Percentage = (Math.round(q2Value * 100) / 100) * 100;

  const handleAnswer = () => {
    const selectedOption = value === "1" ? "optionOne" : "optionTwo";
    const newQuestion = {
      ...question,
      [selectedOption]: {
        ...question[selectedOption],
        votes: [...question[selectedOption].votes, user.id],
      },
    };
    const updatedUser = {
      ...user,
      answers: {
        ...user.answers,
        [question.id]: selectedOption,
      },
    };
    const updatedUsers = {
      ...users,
      [updatedUser.id]: updatedUser,
    };
    dispatch(answerQuestion(newQuestion));
    dispatch(updateUserQuestion(updatedUser));
    dispatch(updateAllUsers(updatedUsers));
  };
  return (
    <Box mt="4">
      {!hasAnswered ? (
        <QuestionWrapper author={question.author} avatarUrl={users[question.author].avatarURL}>
          <Text fontWeight="bold">Would you rather</Text>
          <RadioGroup my="4" ml="4" onChange={setValue} value={value}>
            <Stack>
              <Radio value="1">{question.optionOne.text} </Radio>
              <Radio value="2">{question.optionTwo.text} </Radio>
            </Stack>
          </RadioGroup>
          <Button w="100%" disabled={value === "-1"} onClick={handleAnswer}>
            Submit
          </Button>
        </QuestionWrapper>
      ) : (
        <QuestionWrapper author={question.author} avatarUrl={users[question.author].avatarURL}>
          <Text fontWeight="bold" fontSize="xl">
            Results
          </Text>
          <Text mb="4">Would you rather</Text>
          <Stack spacing="20px">
            <QuestionContainer
              totalQuestions={totalQuestions}
              questionText={question.optionOne.text}
              isSelected={userVotedOptionOne}
              votes={question.optionOne.votes.length}
              percentage={q1Percentage}
            />
            <QuestionContainer
              totalQuestions={totalQuestions}
              questionText={question.optionTwo.text}
              votes={question.optionTwo.votes.length}
              percentage={q2Percentage}
              isSelected={userVotedOptionTwo}
            />
            <Flex justifyContent="flex-end">
              <Button w="max-content" onClick={() => history("/")}>
                Back
              </Button>
            </Flex>
          </Stack>
        </QuestionWrapper>
      )}
    </Box>
  );
};

export default Question;

type QuestionContainerProps = {
  isSelected: boolean;
  questionText: string;
  percentage: number;
  votes: number;
  totalQuestions: number;
};
const QuestionContainer = (props: QuestionContainerProps) => {
  const { totalQuestions, isSelected, percentage, questionText, votes } = props;
  return (
    <Box borderRadius={"5px"} boxShadow="md" p="4" bg="rgb(244, 244, 244)">
      <Flex justifyContent="flex-end">
        {isSelected ? (
          <Box bg="green" borderRadius="50px" p="1">
            <BsCheck color="#fff" size="30px" />
          </Box>
        ) : null}
      </Flex>
      <Text mb="2" fontWeight="bold">
        {questionText}
      </Text>
      <Progress colorScheme="gray" bg="#76767650" height="32px" value={percentage} />
      <Text fontWeight="bold" textAlign="center" mt="2">
        ({percentage}%) {votes} out of {totalQuestions} votes
      </Text>
    </Box>
  );
};
