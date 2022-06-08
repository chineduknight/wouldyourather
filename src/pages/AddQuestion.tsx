import {
  Box,
  Input,
  Text,
  Button,
  FormControl,
  FormErrorMessage,
  useBoolean,
} from "@chakra-ui/react";
import { Dispatch } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { RootState } from "services/redux/configure_store";
import { updateAllUsers, updateUserQuestion } from "services/redux/reducers/auth";
import { updateQuestions } from "services/redux/reducers/questions";
import { IQuestion } from "type";
import { _saveQuestion } from "utils/_DATA";

const labels = {
  q1: "optionOneText",
  q2: "optionTwoText",
};

type Inputs = {
  optionOneText: string;
  optionTwoText: string;
};

const AddQuestion = () => {
  const user: any = useSelector((state: RootState) => state.auth.user);
  const users: any = useSelector((state: RootState) => state.auth.users);
  const questions = useSelector((state: RootState) => state.questions.all);
  const [loading, setLoading] = useBoolean();
  const dispatch: Dispatch<any> = useDispatch();
  const history: NavigateFunction = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading.on();
    const question = {
      ...data,
      author: user.id,
    };
    const newQuestion: any = await _saveQuestion(question);
    const updatedQuestions: Record<string, IQuestion> = {
      ...questions,
      [newQuestion.id]: newQuestion,
    };
    dispatch(updateQuestions(updatedQuestions));

    const updatedUser = {
      ...user,
      questions: [...user.questions, newQuestion.id],
    };
    dispatch(updateUserQuestion(updatedUser));
    const authedUser = user.id;
    const updatedUsers = {
      ...users,
      [authedUser]: {
        ...users[authedUser],
        questions: users[authedUser].questions.concat([newQuestion.id]),
      },
    };
    dispatch(updateAllUsers(updatedUsers));
    setLoading.off();
    history("/");
  };

  return (
    <Box
      border="1px solid rgba(34,36,38,.15)"
      borderRadius="10px"
      boxShadow="0 1px 2px 0 rgb(34 36 38 / 15%)"
      mt="4"
    >
      <Text p="12px 16px" fontWeight={700} fontSize="20px" bg="#f3f4f5">
        Create a New Poll
      </Text>
      <Box mt="4" p="0 16px">
        <Text>Complete the question:</Text>
        <Text my="4" fontWeight="bold" fontSize="18px">
          Would you rather...
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.optionOneText}>
            <Input
              id={labels.q1}
              type="text"
              placeholder="Enter Option One..."
              {...register("optionOneText", { required: true })}
            />
            <FormErrorMessage>Please input Option One</FormErrorMessage>
          </FormControl>
          <Text my="2" fontWeight={700} textAlign="center">
            OR
          </Text>
          <FormControl isInvalid={!!errors.optionTwoText}>
            <Input
              id={labels.q2}
              type="text"
              placeholder="Enter Option Two..."
              {...register("optionTwoText", { required: true })}
            />
            <FormErrorMessage>Please input Option Two</FormErrorMessage>
          </FormControl>
          <Button my="20px" w="100%" type="submit" isLoading={loading}>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddQuestion;
