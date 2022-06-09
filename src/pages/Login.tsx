import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";
import { useState, Dispatch } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PUBLIC_PATHS } from "routes/pagePath";
import { RootState } from "services/redux/configure_store";
import { updateUser } from "services/redux/reducers/auth";
import { IUser } from "type";

export default function SimpleCard() {
  const [selectedUser, setSelectedUser] = useState<any>();

  const users = useSelector((state: RootState) => state.auth.users) as Record<string, IUser>;
  const dispatch: Dispatch<any> = useDispatch();
  const { state }: any = useLocation();
  const navigate = useNavigate();
  const handleSelection = (event) => {
    const userName = event.target.value;
    setSelectedUser(users[userName]);
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} color="blue.500" textAlign="center">
            Welcome to the Would You Rather App!
          </Heading>
          <Heading fontSize={"2xl"}>Please sign in to continue</Heading>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Select A User</FormLabel>
              <Select placeholder="Select option" onChange={handleSelection}>
                {Object.keys(users).map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Stack spacing={10}>
              <Button
                onClick={() => {
                  dispatch(updateUser(selectedUser));
                  navigate(state?.path || "/dashboard");
                }}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Do not have an account{" "}
                <Link style={{ color: "#4299e1" }} to={PUBLIC_PATHS.REGISTER}>
                  Register
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
