import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,AbstractControl } from '@angular/forms';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  text = '';
  loginForm: FormGroup;

  constructor(public testService: TestService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: [''],
      password:['']
    })
  }

  ngOnInit(): void {}

  // getHelloWorld() {
  //   this.testService.getHelloWorld().subscribe((res) => {
  //     console.log(res);
  //     this.text = res;
  //   });
  // }

  onLogin(data: any)
  {
   
    
  }
}
