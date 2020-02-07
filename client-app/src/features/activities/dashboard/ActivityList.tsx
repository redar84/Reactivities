import React, {useContext } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore'
import {Link } from 'react-router-dom';

const ActivityList: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const {activitiesByDate:activities, 
           target,
          deleteActivity, submitting} = activityStore;
    return (
        <Segment clearing>
        <Item.Group divided>
            {activities.map(activity => (
                <Item key={activity.id}>
                    <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                        <Item.Description>
                            <div>{activity.description}</div>
                            <div>{activity.city}, {activity.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button floated="right" 
                            /* onClick={()=> selectActivity(activity.id)} */
                            as={Link}   
                            content="View" 
                            color="blue"
                            to={`/activities/${activity.id}`}/>
                            <Button floated="right" 
                            onClick={(e)=> deleteActivity(e,activity.id)}  
                            content="Delete" color="red"
                            loading={target=== activity.id && submitting}
                            name={activity.id}/>
                            <Label basic content={activity.category}/>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            ))}

        </Item.Group>
        </Segment>
    );
};

export default observer(ActivityList);