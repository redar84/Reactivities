import React from "react";
import { Segment, Header, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Oops- we`ve looked everywhere but couldn`t find this
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/activities" primary>
          Return to Activities Page
        </Button>
      </Segment.Inline>
    </Segment>
  );
}
