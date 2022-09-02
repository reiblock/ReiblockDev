import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  public zipForm!: FormGroup;

  constructor(private fb: FormBuilder,private testService: TestService) {
    this.zipForm = this.fb.group({
      zipCode: ['', [Validators.required,Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(){
    
this.testService.setZipCode(this.zipForm.value.zipCode);
  }
}


