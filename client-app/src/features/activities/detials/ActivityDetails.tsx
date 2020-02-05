import React, { useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore'

const ActivityDetails: React.FC = () => {

    const acivityStore = useContext(ActivityStore);
    const {selectedActivity:activity,
          cancelEditMode, OpenEditForm} = acivityStore;
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity!.description}
          </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button basic color="blue" 
          content="Edit" 
          onClick={()=>OpenEditForm()}/>
          <Button basic color="grey" content="Cancel" onClick={()=>cancelEditMode()}/>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);