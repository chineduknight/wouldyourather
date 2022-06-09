import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useBoolean,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "services/redux/configure_store";
import { IUser } from "type";
import { updateAllUsers, updateUser } from "services/redux/reducers/auth";
import { Dispatch } from "react";
import { _saveUser } from "utils/_DATA";
import { toast } from "react-toastify";
import { PUBLIC_PATHS } from "routes/pagePath";

type Inputs = {
  name: string;
  id: string;
  avatarURL: string;
};

export default function SignupCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const users = useSelector((state: RootState) => state.auth.users) as Record<string, IUser>;
  const dispatch: Dispatch<any> = useDispatch();
  const [loading, setLoading] = useBoolean();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading.on();
    let userName = data.id;
    userName = userName.replace(/\s/g, "");
    userName = userName.toLowerCase();

    const userExists = Object.keys(users).find((user) => user === userName);
    if (userExists) {
      setLoading.off();
      return toast.error("Username has been taken");
    }
    const newUser = {
      ...data,
      id: userName,
      answers: {},
      questions: [],
    };
    const allUsers = {
      ...users,
      [newUser.id]: newUser,
    };
    await _saveUser(newUser);
    dispatch(updateUser(newUser));
    dispatch(updateAllUsers(allUsers));
    setLoading.off();
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} w="md" py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} color="blue.500" textAlign="center">
            Welcome to the Would You Rather App!
          </Heading>
          <Heading fontSize={"2xl"}>Please sign up to start</Heading>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="name" isRequired isInvalid={!!errors.name}>
                <FormLabel mb="0">Name</FormLabel>
                <Input type="text" {...register("name", { required: true })} />
              </FormControl>
              <FormControl my="4" id="username" isRequired>
                <FormLabel mb="0">Username</FormLabel>
                <Input type="text" {...register("id", { required: true })} />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel mb="0">Avatar Url</FormLabel>
                <Input type="text" {...register("avatarURL", { required: true })} />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  isLoading={loading}
                >
                  Sign up
                </Button>
              </Stack>
            </form>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link style={{ color: "#4299e1" }} to={PUBLIC_PATHS.LOGIN}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
