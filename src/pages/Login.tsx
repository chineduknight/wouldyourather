import { Box, Text, Container, Select, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { _getUsers } from "utils/_DATA";
import { useDispatch } from "react-redux";
import { updateUser } from "services/redux/reducers/auth";
import { Dispatch } from "redux";

const Login = () => {
  const [users, setUsers] = useState<any>({});
  const [selectedUser, setSelectedUser] = useState({});
  const dispatch: Dispatch<any> = useDispatch();
  const getUsers = async () => {
    const allUsers: any = await _getUsers();
    setUsers(allUsers || []);
  };

  useEffect(() => {
    getUsers();
  }, []);

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
