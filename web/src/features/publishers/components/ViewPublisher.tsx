import { Box, Heading, List, ListItem, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Link from "../../../components/Link";
import { Publisher } from "../../../types";

interface ViewPublisherProps {
  publisher: Publisher;
}

export const ViewPublisher = ({
  publisher,
}: ViewPublisherProps): React.ReactElement => {
  return (
    <Stack>
      <Box p={6}>
        <Box p={10}>
          <Stack spacing={0} align="center" mb={5}>
            <Heading size="2xl" fontWeight={500}>
              {publisher.name}
            </Heading>
          </Stack>
        </Box>
        <List>
          {publisher.series.map((s) => (
            <ListItem key={s.id}>
              <Link to={`/series/${s.id}`}>{s.name}</Link>
            </ListItem>
          ))}
        </List>
      </Box>
      <Text>Originally created:{publisher.createdAt}</Text>
      <Text>Last updated at{publisher.updatedAt}</Text>
    </Stack>
  );
};