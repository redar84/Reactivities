import { observable, action, computed } from 'mobx'
import { createContext } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';
class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable selectedActivity: IActivity | undefined;
  @observable loadingInitail = false;
  @observable editMode = false;
  @observable submitting = false;
  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values())
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }
  @action loadActivities = async () => {
    this.loadingInitail = true;
    try {
      const activities = await agent.Activities.list();
      activities.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        this.activityRegistry.set(activity.id, activity);
      });
      this.loadingInitail = false;
    } catch (error) {
      console.log(error.response);
      this.loadingInitail = false;
    }
  }
  @action cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
    this.editMode = false;
  }
  @action cancelFormCreate = () => {
    this.editMode = false
  }
  @action OpenEditForm= (id:string) =>{
    this.selectedActivity = this.activityRegistry.get(id) 
    this.editMode = true;
  }
  @action openCreateForm = () => {
    this.selectedActivity = undefined;
    this.editMode = true
  }
  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false
  }

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      this.activityRegistry.set(activity.id, activity)
      this.selectedActivity = activity
      this.editMode = false;
      this.submitting = false
    } catch (error) {
      console.log(error)
      this.submitting = false
    }
  }

  @action editActivity = async (activity:IActivity)=>{
     this.submitting = true;
     try{
      await agent.Activities.update(activity)
      this.activityRegistry.set(activity.id, activity);
      this.selectedActivity = activity;
      this.submitting = false
      this.editMode = false;
      
     }catch(error){
          console.log(error)
          this.submitting = false
     }
     
  } 

}

export default createContext(new ActivityStore())