import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/providers/contact.service';
import { Contact } from 'src/app/models/contact';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contact-details-form',
  templateUrl: './contact-details-form.component.html',
  styleUrls: ['./contact-details-form.component.scss']
})
export class ContactDetailsFormComponent implements OnInit {
  message: string;
  contactId: number;
  contactForm: FormGroup;
  contact: Contact = new Contact();
  constructor(private router: Router, private contactService: ContactService, private route: ActivatedRoute, private contactFormBuilder: FormBuilder) {

    this.contactId = +this.route.snapshot.params.id;
    this.contactForm = this.contactFormBuilder.group({
      FirstName: ['', [Validators.pattern('[a-zA-Z ]*$')]],
      Email: ['', [Validators.email]],
      LastName: ['', [Validators.pattern('[a-zA-Z ]*$')]],
      Phone: [''],
      IsActive: [''],
      Id: ['']
    });
  }

  ngOnInit() {
    if (this.contactId) {
      this.getContactDetails();
    }
  }

  /** This function is for navigate to home screen */
  navigateToHome() {
    this.router.navigate(['/']);
  }

  /** This function is to fetch contact details by id */
  getContactDetails() {
    this.contactService.getContactDetails(this.contactId).subscribe((data: Contact) => {
      this.contactForm.controls.FirstName.setValue(data.FirstName);
      this.contactForm.controls.LastName.setValue(data.LastName);
      this.contactForm.controls.Email.setValue(data.Email);
      this.contactForm.controls.Phone.setValue(data.Phone);
      this.contactForm.controls.IsActive.setValue(data.IsActive);
      this.contactForm.controls.Id.setValue(data.Id);
    }, (error) => {
      console.log(error);
    });

  }

  /** Save contact details */
  addContactDetails() {
    if (this.contactForm.valid) {
      this.contact.FirstName = this.contactForm.controls.FirstName.value;
      this.contact.LastName = this.contactForm.controls.LastName.value;
      this.contact.Email = this.contactForm.controls.Email.value;
      this.contact.Phone = this.contactForm.controls.Phone.value;
      this.contact.IsActive = this.contactForm.controls.IsActive.value;
      this.contact.Id = this.contactForm.controls.Id.value;
      this.contactService.addContactDetails(this.contact).subscribe((success: boolean) => {
        this.message = !this.contact.Id ? 'Contact added successfully' : 'Contact updated successfully';
        setTimeout(() => {
          this.message = '';
          this.navigateToHome();
        }, 3000);
      }, (error) => {
      });
    } else {
      alert('Fill all the fields');
    }
  }

}
