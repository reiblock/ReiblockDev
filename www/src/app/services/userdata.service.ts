import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  userData: any = {};

  constructor() { }

  setValue(data: any) {
    this.userData['address'] = data.address;
    this.userData['zipCode'] = data.zipCode;
  }
  getValue() {
    return this.userData;
  }
}
