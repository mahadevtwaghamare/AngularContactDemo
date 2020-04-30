import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailsFormComponent } from './contact-details-form/contact-details-form.component';



@NgModule({
  declarations: [ContactListComponent, ContactDetailsFormComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ContactModule { }
