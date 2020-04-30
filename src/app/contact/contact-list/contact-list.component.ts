import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/providers/contact.service';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  constructor(private router: Router, private contactService: ContactService) { }

  public contactDetails: any;
  ngOnInit() {
    this.getContactDetails();
  }

  /** For navigate to contact details screen */
  navigateToContactDetails(contactId = 0) {
    this.router.navigate(['contact-details', contactId]);
  }


  /** This function is for fetching all contact details */
  getContactDetails() {
    this.contactService.getContactsList().subscribe((data: Contact[]) => {
      this.contactDetails = data;
    }, (error) => {
      console.log(error);
    });
  }

  /** This fucntion is to delete contact details */
  deleteContact(contactId) {
    if (confirm('Do you want to delete the contact')) {
      this.contactService.deleteContactDeatails(contactId).subscribe((data: Contact) => {
        alert('Contact deleted successfully');
        this.getContactDetails();
      }, (error) => {
        console.log(error);
      });

    }
  }

}
