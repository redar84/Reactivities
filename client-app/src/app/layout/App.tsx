import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import "./styles.css";
import NavBar from "../../features/nav/NavBar";
import { Route, withRouter, RouteComponentProps, Switch } from "react-router-dom";
import ActivityForm from "../../features/activities/dashboard/form/form/ActivityForm";
import { observer } from "mobx-react-lite";
import HomePage from "../../features/home/HomePage";
import ActivityDetails from "../../features/activities/detials/ActivityDetails";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import NotFound from "./NotFound";
import {ToastContainer} from 'react-toastify'
const App: React.FC<RouteComponentProps> = ({ location }) => {
  /* const [activities, setActivity] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null)
  const [editMode, setEditMode] = useState(false)
  const[submitting, setSubmitting] =  useState(false);
  const[target,setTarget] = useState('') */

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
  /*   const handleEditActivity = (activity:IActivity) =>{
    setSubmitting(true);
    agent.Activities.update(activity).then(()=>{
      setActivity([...activities.filter(a=>a.id !== activity.id), activity])
      setSelectedActivity(activity)
      setEditMode(false);
    }).then(()=> setSubmitting(false))
  } */
  /* const handelDeleteActivity =(event:SyntheticEvent<HTMLButtonElement>, id:string)=>{
    setSubmitting(true);
    setTarget(event.currentTarget.name)
    agent.Activities.delete(id).then(()=>{
      setActivity([...activities.filter(a=>a.id !== id)])
    }).then(()=> setSubmitting(false))
   
  } */

  return (
    <Fragment>
    <ToastContainer position="bottom-right"/>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              />
              <Route  component={NotFound} />
              </Switch>
             
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
