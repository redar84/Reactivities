import React from "react";
import { Item, Button, Label, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IActivity } from "../../../app/models/activity";
interface IProps {
  activity: IActivity;
}
const ActivityListItem: React.FC<IProps> = ({ activity }) => {
  return (
    <Segment.Group>
      <Segment>
          <Item.Group>
        <Item>
          <Item.Image size="tiny" circular src="assets/user.png" />
          <Item.Content>
            <Item.Header as="a">{activity.title}</Item.Header>
            <Item.Description>Hostd By</Item.Description>
          </Item.Content>
        </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" /> {activity.date}
        <Icon name="marker" />
        {activity.venue}, {activity.city}
      </Segment>
      <Segment secondary>Attendees will go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          floated="right"
          as={Link}
          content="View"
          color="blue"
          to={`/activities/${activity.id}`}
        />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;