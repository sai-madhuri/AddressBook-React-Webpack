import * as React from 'react';
import { Contact } from './Contact';
import { UpsertContact, GetContactById, GetContactsLength } from "../services/ContactService";
import Home from './HomeComponent';
import { Redirect, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import DisplaySelectedContact from './DisplayContactComponent';

class DetailsForm extends React.Component<any, any>{
  action: string;
  newContact: Contact;
  contact: Contact = GetContactById(this.props.match.params.id);
  constructor(props: any) {
    super(props);
    if (this.contact !== undefined) {
      this.state = {
        viewForm: true,
        id: this.contact.id,
        name: this.contact.name,
        email: this.contact.email,
        mobile: this.contact.mobile,
        landLine: this.contact.landLine,
        website: this.contact.website,
        address: this.contact.address,
        errors: {
          name: '',
          mobile: '',
          email: ''
        },
        isFormValid: true,
        validationMessage: "",
        isUpsertSuccessful: false
      };
      this.action = "Update";
    }

    else {
      this.state = {
        viewForm: true, id: GetContactsLength() + 1, name: '', email: '', mobile: '',
        landLine: '', address: '', website: '', errors: {
          name: '*',
          mobile: '*',
          email: '*'
        },
        isFormValid: false,
        validationMessage: "",
        isUpsertSuccessful: false
      };
      this.action = "Add";
    }

    this.submitDetails = this.submitDetails.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.newContact = this.props.contact;
  }


  validateField(fieldName: string, fieldValue: string) {
    const name = fieldName, value = fieldValue;
    let errors = this.state.errors;

    switch (name) {
      case 'name':
        var regex = /^([a-zA-Z ]{2})+([a-zA-Z ])*$/;
        errors.name = regex.test(value) ? '' : 'Please enter a valid name';
        break;
      case 'email':
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
        errors.email =
          regex.test(value)
            ? ''
            : 'Email is not valid';
        break;
      case 'mobile': var regex = /^(?:(?:\+)91(\s*[\ -]\s*)?)?(\d[ -]?){9}\d$/;
        errors.mobile = regex.test(value) ? '' : 'Please enter a valid mobile number';
        if (value.length < 10) errors.mobile = "Mobile number cannot be less than 10 digits";
        if (value.length == 0) errors.mobile = "Mobile number cannot be empty";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }

  validateForm(errors: any) {
    let count = 0;

    Object.values(errors).forEach((value: any) => {
      if (value.length > 0) count += 1;
    });

    if (count > 0) {
      this.setState({ isFormValid: false, validationMessage: "* Please fill the required fields with valid data" });
      return false;
    }
    else this.setState({ isFormValid: true, validationMessage: "" });
    return true;
  }

  submitDetails() {
    if (this.validateForm(this.state.errors)) {
      var contact = new Contact(this.state.id, this.state.email, this.state.name, this.state.mobile, this.state.landLine, this.state.website, this.state.address);
      if (this.contact === undefined) {
        contact.address = this.state.address.replace(/(?:(?:\n)\s*){2}/gm, "\n");
      }
      else {
        contact.id = this.contact.id;
        contact.address = this.state.address.replace(/(?:(?:\n)\s*){2}/gm, "\n");
      }
      var contactId: number = UpsertContact(contact);
      this.setState({ isUpsertSuccessful: true, id: contactId });
      this.props.history.push("/displayContact/"+contactId);
    }
    else {
      this.setState({ isUpsertSuccessful: false });
    }
  }

  handleChange(event: any) {
    const target = event.target;
    const fieldName = target.name;
    this.setState({ [fieldName]: event.target.value });
    this.validateField(fieldName, event.target.value);
  }

  render() {
    const errors = this.state.errors;
    if (!this.state.isUpsertSuccessful) {
      return (
        <div>
          {/* <Home /> */}
          <div id="addContactForm" className="detailsForm">
            <form id="addContactDetails">
              <div className="error">{this.state.validationMessage}</div>
              <label>Name {errors.name.length > 0 ?
                <span className='error'>{errors.name}</span> : "*"}</label><br />

              <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} required /><br />
              <label>Email {errors.email.length > 0 ?
                <span className='error'>{errors.email}</span> : "*"}
              </label><br />
              <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required /><br />
              <div className="table">
                <span className="box">
                  <label>Mobile {errors.mobile.length > 0 ?
                    <span className='error'>{errors.mobile}</span> : "*"}</label>
                  <br />
                </span>
                <span>
                  <label>Landline</label>
                </span>
              </div>
              <span className="box">
                <input type="text" name="mobile" value={this.state.mobile} onChange={this.handleChange} required />
              </span>
              <span className="box">
                <input type="text" name="landLine" value={this.state.landLine} onChange={this.handleChange} />
              </span><br />
              <label>Website</label><br />
              <input type="text" name="website" value={this.state.website} onChange={this.handleChange} /><br />
              <label>Address</label><br />
              <textarea name="address" value={this.state.address} onChange={this.handleChange}></textarea><br /><br />
              <input type="button" className="submitDetailsButton" onClick={this.submitDetails} value={this.action} />
            </form>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(DetailsForm);