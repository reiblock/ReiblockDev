import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  serviceEmail:any;
  constructor() {}

 setZipCode(email:any){
  this.serviceEmail = email
 }

 getZipCode(){
  return this.serviceEmail
 }
}
