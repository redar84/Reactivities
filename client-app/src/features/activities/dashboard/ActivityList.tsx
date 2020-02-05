import React, { SyntheticEvent, useContext } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore'
interface IProps {  
    deleteActivity:(e:SyntheticEvent<HTMLButtonElement>,id:string)=>void;
    submitting: boolean;
    target:string;
}
const ActivityList: React.FC<IProps> = ({  
    target,deleteActivity, submitting }) => {
    const activityStore = useContext(ActivityStore);
    const {activitiesByDate:activities, selectActivity} = activityStore;
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
                            <Button floated="right" onClick={()=> selectActivity(activity.id)}  
                            content="View" color="blue"/>
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