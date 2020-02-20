import { Contact } from "../components/Contact";

var contacts: any = [];
var contact : Contact = new Contact(1, "sashi.p@technovert.net", "Sashi Pagadala", "8919747429", "12345678", "www.technovert.com", "Hyderabad");
contacts.push(contact);
contact = new Contact(2, "chandermani.a@gmail.com", "Chandermani", "9703506166", "123456789", "www.teemad.com", "Seattle");
contacts.push(contact);
export const GetAllContacts = () => {
    return contacts;
}

export const GetContactById = (id : number)=>{
    return contacts[contacts.findIndex((obj: { id: number; })=>obj.id==id)];
}

export const GetContactsLength =()=>{
    return contacts.length;
}

export const UpsertContact = (contact: Contact) => {
    try {
        if (contact.id == contacts.length+1) {
            contacts.push(contact);
        }
        else {
            var index: number = contacts.findIndex((obj: { id: number; }) => obj.id == contact.id);
            contacts[index] = contact;
        }
        return contact.id;
    }
    catch (exception) {
        console.log(exception);
        return -1;
    }
}

export const DeleteContact = (contact: Contact) => {
    try {
        var index: number = contacts.findIndex((obj: { id: number; }) => obj.id == contact.id);
        contacts.splice(index, 1);
        if (index != contacts.length) {
            for (var i = index; i <= contacts.length; i++) {
                contacts[index].id -= 1;
            }
        }
    }
    catch (exception) {
        console.log("Exception raised during deletion : " + exception);
        return false;
    }
}
