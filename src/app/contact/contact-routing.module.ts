import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from '../contact/contact-list/contact-list.component';
import { ContactDetailsFormComponent } from './contact-details-form/contact-details-form.component';

const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'contact-details/:id', component: ContactDetailsFormComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
