import React, { useState, useEffect, Fragment, SyntheticEvent, useContext } from "react";
import { Container } from "semantic-ui-react";
import "./styles.css";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from '../stores/activityStore';
import {observer} from 'mobx-react-lite';
const App = () => {
  const activityStore = useContext(ActivityStore);
  const [activities, setActivity] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null)
  const [editMode, setEditMode] = useState(false)
  const[submitting, setSubmitting] =  useState(false);
  const[target,setTarget] = useState('')
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])
  /*
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])
    setEditMode(false)
  }
  */
  /* const handleOpenCreateForm = ()=>{
    setSelectedActivity(null);
    setEditMode(true)
  } */
 /*  const handleCreatActivity = (activity:IActivity) =>{

    setSubmitting(true);
    agent.Activities.create(activity).then(()=>{
      setActivity([...activities, activity])
      setSelectedActivity(activity)
      setEditMode(false);
     
    }).then(()=>  setSubmitting(false))
  } */
  const handleEditActivity = (activity:IActivity) =>{
    setSubmitting(true);
    agent.Activities.update(activity).then(()=>{
      setActivity([...activities.filter(a=>a.id !== activity.id), activity])
      setSelectedActivity(activity)
      setEditMode(false);
    }).then(()=> setSubmitting(false))
  }
  const handelDeleteActivity =(event:SyntheticEvent<HTMLButtonElement>, id:string)=>{
    setSubmitting(true);
    setTarget(event.currentTarget.name)
    agent.Activities.delete(id).then(()=>{
      setActivity([...activities.filter(a=>a.id !== id)])
    }).then(()=> setSubmitting(false))
   
  }
  if(activityStore.loadingInitail) return <LoadingComponent content="Loading....."/>
  return (
    <Fragment>
      <NavBar/>
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          submitting ={submitting} 
          activities={activityStore.activities}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          deleteActivity={handelDeleteActivity}
          target={target}/>
      </Container>
    </Fragment>
  );
}


export default observer(App);
