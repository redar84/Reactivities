import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
class App extends Component {
  state={
    values : []
  }
  componentDidMount(){
    console.log("Did Mount");
    axios.get('http://localhost:5000/api/values')
    .then((response)=>{
      console.log("hi" + response.data);
      this.setState({
        values: response.data
      })
    }).catch((error)=>{
      console.log(error.response)
    })
    
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
         <ul>
           {this.state.values.map((value:any)=>(
            <li>{value.name}</li>))}
         </ul>
        </header>
      </div>
    );
  }
  
}

export default App;
