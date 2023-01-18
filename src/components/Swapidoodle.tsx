import { MetadataMeta } from "./MetadataMeta";
import { Box, Center, Container, Heading, Spinner } from "@chakra-ui/react";
import {
  Swap,
  usePublicKey,
  useTokenSwapFromId,
} from "@strata-foundation/react";

import React from "react";


export const SwapDisplay = ({
  name,
  image,
  description,
}: any) => {
  const idRaw = "4Vyh36V9dYQdqUtxWc2nEzvezLjKn5qW5rPWACo8wddF";
  const id = usePublicKey(idRaw as string);
  const { 
    tokenBonding, 
    loading,
  } = useTokenSwapFromId(id);
  return (
    <Box
      w="full"
      backgroundColor="#f9f9f9"
      height="90%"
      overflow="auto"
      paddingBottom="10%"
    >
      <MetadataMeta
        title={`Stacc Swap | ${name}`}
        description={description}
        image={image}
        url={`/swap/${ id?.toString() }/`}
      />
      <Box padding="54px" backgroundColor="black.500" />
      <Container mt="-5%" justifyContent="stretch" >
        <Heading mb={2} color="white" fontSize="12px" fontWeight={600}>
          Swap
        </Heading>
        <Box
          padding={4}
          zIndex={1}
          bg="white"
          shadow="xl"
          rounded="lg"
          minH="40%"
        >
          {loading && (
            <Center>
              <Spinner />
            </Center>
          )}
          {!loading && tokenBonding && (
            <Swap id={id!} />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default SwapDisplay;
