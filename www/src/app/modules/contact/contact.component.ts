import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public contactForm!: FormGroup;
  zip: any;

  constructor(private fb: FormBuilder,private testService: TestService) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {  
    this.zip = this.testService.getZipCode()
    this.contactForm.get('zipCode')?.setValue(this.zip)
  }
}
