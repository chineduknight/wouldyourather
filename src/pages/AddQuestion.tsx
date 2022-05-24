import { Box, Input, Text, Button } from "@chakra-ui/react";

const AddQuestion = () => {
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
        <Input />
        <Text my="2" fontWeight={700} textAlign="center">
          OR
        </Text>
        <Input />
        <Button my="20px" w="100%">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AddQuestion;
