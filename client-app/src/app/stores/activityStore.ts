import { observable, action, computed, configure, runInAction } from 'mobx'
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';
configure({enforceActions: 'always'})
class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable activity: IActivity | undefined;
  @observable loadingInitail = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = '';
  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values())
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }
  @action loadActivities = async () => {
    this.loadingInitail = true;
    try {
      const activities = await agent.Activities.list();
      runInAction('Loading activities',()=>{
        activities.forEach(activity => {
          activity.date = activity.date.split('.')[0];
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitail = false;
      })
     
    } catch (error) {
      runInAction('loading error',()=>{
        
        this.loadingInitail = false;
      })
      console.log(error.response);
    }
  }
  @action loadActivity = async (id:string) =>{
    
    let activity = this.getActivity(id);
    if(activity) {this.activity = activity}
    else{
      this.loadingInitail = true;
      try {
        activity = await agent.Activities.detials(id);
        runInAction('Getting activity', ()=>{
          this.activity = activity
          this.loadingInitail = false;
        })
      } catch (error) {
        this.loadingInitail = false;
        console.log(error)
      }
    }
    
  }
  getActivity = (id:string) =>{
        return this.activityRegistry.get(id);
  }
  @action cancelSelectedActivity = () => {
    this.activity = undefined;
    this.editMode = false;
  }
  @action cancelFormCreate = () => {
    this.editMode = false
  }
  @action OpenEditForm= (id:string) =>{
    this.activity = this.activityRegistry.get(id) 
    this.editMode = true;
  }
  @action openCreateForm = () => {
    this.activity = undefined;
    this.editMode = true
  }
  @action selectActivity = (id: string) => {
    this.activity = this.activityRegistry.get(id);
    this.editMode = false
  }

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction('Creating Activity',()=>{
        this.activityRegistry.set(activity.id, activity)
        this.activity = activity
        this.editMode = false;
        this.submitting = false
      }) 
    } catch (error) {
      runInAction('error creating activity',()=>{
        this.submitting = false
      })
      console.log(error)
      
    }
  }

  @action editActivity = async (activity:IActivity)=>{
     this.submitting = true;
     try{
      await agent.Activities.update(activity)
      runInAction('Editing an Activity', ()=>{
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false
        this.editMode = false;
      })
    
      
     }catch(error){
       runInAction('Error Running activity',()=>{
        this.submitting = false
       })
          console.log(error)
          
     }
     
  } 

  @action deleteActivity = async(event:SyntheticEvent<HTMLButtonElement>,id:string) =>{
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction('Deleting an Activity',()=>{
        this.activityRegistry.delete(id)
        this.submitting = false;
        this.target ='';
      })
     
    } catch (error) {
      runInAction('Error Deleting Activity', ()=>{
        this.submitting = false;
        this.target ='';
      })
      console.log(error);
    }
  }

}

export default createContext(new ActivityStore())