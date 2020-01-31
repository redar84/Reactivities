import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import "./styles.css";
import axios from "axios";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivity] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    axios.get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => {
        let activities:IActivity[] = []
        response.data.forEach(activity =>{
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        })
        setActivity(activities);
      })
      .catch(error => {
        console.log(error.response);
      });

  }, [])
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])
    setEditMode(false)
  }
  const handleOpenCreateForm = ()=>{
    setSelectedActivity(null);
    setEditMode(true)
  }
  const handleCreatActivity = (activity:IActivity) =>{
    setActivity([...activities, activity])
    setSelectedActivity(activity)
    setEditMode(false);

  }
  const handleEditActivity = (activity:IActivity) =>{
    setActivity([...activities.filter(a=>a.id !== activity.id), activity])
    setSelectedActivity(activity)
    setEditMode(false);
  }
  const handelDeleteActivity =(id:string)=>{
    setActivity([...activities.filter(a=>a.id !== id)])
  }
  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm}/>
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          selectActivity={handleSelectActivity}
          activities={activities}
          selectedActivity={selectedActivity} 
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreatActivity}
          editActivity={handleEditActivity}
          deleteActivity={handelDeleteActivity}/>
      </Container>
    </Fragment>
  );
}


export default App;
