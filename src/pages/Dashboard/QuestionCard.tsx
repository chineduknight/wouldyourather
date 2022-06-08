import { Text, Button } from "@chakra-ui/react";
import QuestionWrapper from "components/QuestionWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PROTECTED_PATHS } from "routes/pagePath";
import { RootState } from "services/redux/configure_store";
import { setQuestion } from "services/redux/reducers/questions";
import { IQuestion, IUser } from "type";
import { convertParamsToString } from "utils/helper";

type QuestionCardProps = {
  question: IQuestion;
  hasAnswered?: boolean;
};
const QuestionCard = (props: QuestionCardProps) => {
  const { question, hasAnswered = false } = props;
  const { author, optionOne } = question;
  const history = useNavigate();
  const users = useSelector((state: RootState) => state.auth.users) as Record<string, IUser>;

  const dispatch = useDispatch();
  const goToQuestion = () => {
    dispatch(setQuestion(question));
    const url = convertParamsToString(PROTECTED_PATHS.QUESTION, { id: question.id });
    history(url);
  };
  return (
    <QuestionWrapper author={author} avatarUrl={users[author].avatarURL}>
      <Text fontWeight="bold">Would you rather</Text>
      <Text mt="3" textAlign="center">
        {optionOne.text}
      </Text>
      <Text textAlign="center">or...</Text>
      <Button onClick={goToQuestion} mt="2" w="100%" bg={hasAnswered ? "blue" : "green"}>
        Answer Poll
      </Button>
    </QuestionWrapper>
  );
};

export default QuestionCard;
