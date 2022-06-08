import { Box, Text, Container, Select, Button } from "@chakra-ui/react";
import { Dispatch, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "services/redux/reducers/auth";
import { RootState } from "services/redux/configure_store";
import { IUser } from "type";

const Login = () => {
  const [selectedUser, setSelectedUser] = useState<any>();

  const users = useSelector((state: RootState) => state.auth.users) as Record<string, IUser>;
  const dispatch: Dispatch<any> = useDispatch();

  const handleSelection = (event) => {
    const userName = event.target.value;
    setSelectedUser(users[userName]);
  };

  return (
    <Container>
      <Box mt="12">
        <Text>Welcome to Would You Rather App!</Text>
        <Text>Please sign in to continue</Text>
        <Box>All images here</Box>
        <Select placeholder="Select option" onChange={handleSelection}>
          {Object.keys(users).map((user) => (
            <option key={user} value={user}>
              {" "}
              {user}{" "}
            </option>
          ))}
        </Select>
        <Button w="100%" onClick={() => dispatch(updateUser(selectedUser))}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
