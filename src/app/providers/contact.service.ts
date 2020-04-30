import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }
  public contactDetails: any = [
    {
      Id: 101,
      FirstName: 'Mahadev',
      LastName: 'Waghamare',
      Email: 'maha@test.com',
      Phone: 9863655686,
      IsActive: true
    },
    {
      Id: 102,
      FirstName: 'Jay',
      LastName: 'Joshi',
      Email: 'jay@test.com',
      Phone: 986365589,
      IsActive: false
    }
  ];
  public getContactsList(): Observable<any> {
    return of(this.contactDetails);
    // return this.http.get(environment.API_URL + 'contact');
  }

  public getContactDetails(id): Observable<any> {
    return of(this.contactDetails.find(x => x.Id === +id));
    // return this.http.get(environment.API_URL + 'contact/${id}');
  }

  public addContactDetails(contact: any) {
    const contactObject = {
      Id: contact.Id,
      FirstName: contact.FirstName,
      LastName: contact.LastName,
      Email: contact.Email,
      Phone: contact.Phone,
      IsActive: contact.IsActive,
    };
    if (!contact.Id) {
      contactObject.Id = Math.floor(100000 + Math.random() * 900000);
      this.contactDetails.unshift(contactObject);
      return of(true);
      // return this.http.post(environment.API_URL + 'contact', JSON.parse(JSON.stringify(contact)));
    } else {
      const index = this.contactDetails.findIndex(x => x.Id === contactObject.Id);
      this.contactDetails[index] = contactObject;
      return of(true);
      // return this.http.put(environment.API_URL + 'contact/${contact.Id}', JSON.parse(JSON.stringify(contact)));
    }
  }

  public deleteContactDeatails(id): Observable<any> {
    const index = this.contactDetails.findIndex(x => x.Id === id);
    const res = this.contactDetails.splice(index, 1);
    return of(true);
    // return this.http.delete(environment.API_URL + 'contact/${id}');
  }

}
