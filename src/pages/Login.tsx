import { Box, Text, Container, Select, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { _getUsers } from "utils/_DATA";
const Login = () => {
  const [users, setUsers] = useState<any>([]);
  const getUsers = async () => {
    const getU: any = await _getUsers();
    console.log("getU:", Object.keys(getU));
    setUsers(Object.keys(getU) || []);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container>
      <Box mt="12">
        <Text>Welcome to Would You Rather App!</Text>
        <Text>Please sign in to continue</Text>
        <Box>All images here</Box>
        <Select placeholder="Select option">
          {users.map((user) => (
            <option key={user} value={user}>
              {" "}
              {user}{" "}
            </option>
          ))}
        </Select>
        <Button w="100%">Login</Button>
      </Box>
    </Container>
  );
};

export default Login;
