
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { AuthService } from 'src/app/services/auth.service';
import { TestService } from 'src/app/services/test.service';
import { UserdataService } from 'src/app/services/userdata.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  @ViewChild("placesRef") placesRef: GooglePlaceDirective | undefined;
  public contactForm!: FormGroup;
  zip: any;
  autocomplete: any;
  formattedAddress = ''

  constructor(private fb: FormBuilder,
    private testService: TestService,
    private authService: AuthService,
    private userdataService: UserdataService) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      zipCode: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.zip = this.testService.getZipCode()
    this.contactForm.get('zipCode')?.setValue(this.zip)

    // this.mapsAPILoader.load().then(() => {
    //   this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    //     componentRestrictions: { country: 'IN' },
    //     types: []
    //   });
    // });
  }

  options = {
    componentRestrictions: { country: ['US'] }
  }


  handleAddressChange(address: Address) {
    this.formattedAddress = address.formatted_address;
  }

  onSubject(data: any) {
    let tempFormData = this.contactForm.value;
    tempFormData['subject'] = data;
    this.userdataService.setValue(tempFormData);
    this.authService.sendSubject(tempFormData).subscribe((res: any) => {
      if (res) {

      }
    });
  }
}
