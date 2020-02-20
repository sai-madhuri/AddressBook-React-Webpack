import { Contact } from "./Contact";
import * as React from "react";
import { GetAllContacts } from "../services/ContactService";
import { Link, BrowserRouter, NavLink } from "react-router-dom";

class ContactsList extends React.Component<any, any>{

  contacts: Contact[] = GetAllContacts();

  constructor(props: any) {
    super(props);
    this.state = { active: -1 };
  }

  listItems: any = []

  render() {
    console.log('contacts list');
    this.listItems = this.contacts.map((contact: { contact: Contact; id: number, name: string, email: string, mobile: string }) =>
      (
        <NavLink to={"/displayContact/" + contact.id} activeClassName="highLight">
          <div className="listItem"  key={contact.id}>
            <li>
              <p className='name'>{contact.name}</p>
              <p>{contact.email}</p>
              <p>{contact.mobile}</p>
            </li>
          </div>
        </NavLink>
      )
    )
    return (
      <div className="contactList">
        <p className="contactHeading">CONTACTS</p>
        <ul>
          {this.listItems}
        </ul>
      </div>
    );
  }
}

export default ContactsList;