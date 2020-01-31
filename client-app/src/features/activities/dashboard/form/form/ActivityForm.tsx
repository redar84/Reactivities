import React, { useState, FormEvent} from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../../../app/models/activity';
import {v4 as uuid} from 'uuid';
interface IProps {
    setEditMode: (editMode: boolean) => void
    activity: IActivity
    createActivity: (activity:IActivity)=> void;
    editActivity:(activity:IActivity) => void;
    submitting: boolean;
}
const ActivityForm: React.FC<IProps> = ({
     setEditMode,
     activity: intializeFormState,
     createActivity,
     editActivity,
     submitting
     }) => {
    const intializeForm = () => {
        if (intializeFormState) {
            
            return intializeFormState
        } else {
            return   {
                id:'',
                title: '',
                description:'',
                category:'',
                date:'',
                city:'',
                venue:''};
        };
        
    }
    const [activity, setActivity] = useState<IActivity>(intializeForm);
    const handelSubmit =()=>{
        if(activity.id.length === 0){
            let newActivity = {
                ...activity,
                id: uuid()
            }
        
            createActivity(newActivity)
            
        }else{
            editActivity(activity)
            
        }
    }
    const handleInputChange = (event:FormEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const{name,value} = event.currentTarget 
        setActivity({...activity, [name]:value })

    } 
    return (
        <Segment clearing>
            <Form onSubmit={handelSubmit}>
                <Form.Input onChange={handleInputChange} 
                name="title" placeholder="Title" value={activity.title} />
                <Form.TextArea rows={2} 
                name="description" onChange={handleInputChange}
                placeholder="Description" value={activity.description}/>
                <Form.Input 
                name="category" onChange={handleInputChange}
                 placeholder="Category" value={activity.category} />
                <Form.Input onChange={handleInputChange}
                name="date" type="datetime-local" placeholder="Date" value={activity.date} />
                <Form.Input 
                name="venue" 
                onChange={handleInputChange}
                placeholder="Venue" 
                value={activity.venue} />
                <Form.Input
                name="city" onChange={handleInputChange}
                placeholder="City" value={activity.city}/>
                <Button content="Submit" 
                floated="right"
                positive type="submit"
                loading={submitting}
                 />
                <Button content="Cancel" 
                onClick={() => setEditMode(false)} 
                floated="right" type="submit" />
            </Form>
        </Segment>
    );
};

export default ActivityForm;