import * as React from 'react';
import '../css/App.css';
import blogIcon from '../images/blog-icon.png';
import {Contact} from './Contact';
import DisplaySelectedContact from './DisplayContactComponent';
import DetailsForm from './FormComponent';
import ContactsList from './ContactsListComponent';
import { Link, Router, RouteComponentProps, BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import {GetAllContacts} from "../services/ContactService";

import FormComponent from './FormComponent';
import DisplayContactComponent from './DisplayContactComponent';

class Home extends React.Component<any,any>{
  actionSelected: any;
  selectedId: number = -1;
  contacts : Contact[] =[]

  constructor(props : any)
  {
    super(props);
    this.state = {displayAllContacts : true};
    this.contacts = GetAllContacts();
  }

  // displayContact=(id : number)=>
  // {
  //   this.setState({viewForm : false, shouldDisplaySelectedContact : true});
  //   this.selectedId = id;
  // }

  render()
  {
    console.log('Home');
    return(
      <div>
          <div className="pageContent">
            <div className="mainHeading">
                Address Book
            </div>

            <div className="horizontalNavigationBar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/add">+Add</Link></li>
                    <li><img src={blogIcon} alt="bing-logo"/></li>
                </ul>
            </div>

            <ContactsList /> 
            </div>


            </div>
    );
  }
}

export default Home;
