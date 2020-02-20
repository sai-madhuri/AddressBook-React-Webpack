import * as React from 'react';
import editIcon from '../images/Edit-icon.png';
import deleteIcon from '../images/delete-icon.png';
import { GetContactById, DeleteContact } from '../services/ContactService';
import { Contact } from './Contact';
import { Link } from 'react-router-dom';
import Home from './HomeComponent';

function DisplaySelectedContact(props: any) {
    if(props.id!==undefined) var contact: Contact = GetContactById(props.id)
    else var contact: Contact = GetContactById(props.match.params.id);
    return (
        <div>
            {/* <Home /> */}
            <div id="contactInformation">
                <div className="displaySelectedContact">
                    <p>{contact.name}</p>
                    <Link to={"/update/"+contact.id} >
                    <img className="icons" src={editIcon} alt="edit-icon" /><button id="editContact">
                        Edit </button></Link>
                    <Link to={"/"} >
                    <img className="icons" src={deleteIcon} alt="delete-icon" />
                    <button id="deleteContact" onClick={() => DeleteContact(contact)}>Delete</button>
                    </Link>
                </div>
                <div className="displayEmail">
                    <p>Email :  {contact.email}</p>
                </div>
                <div className="contactDetails">
                    <div className="mobile"><p>Mobile : {contact.mobile}</p></div>
                    <div className="landline"><p>Landline :  {contact.landLine}</p></div>
                </div>
                <div className="website">
                    <p>Website :{contact.website}</p>
                </div>
                <div className="Address">
                    <div className="address">Address : <pre>{contact.address}</pre></div>
                </div>
            </div>
        </div>
    );
}

export default DisplaySelectedContact;