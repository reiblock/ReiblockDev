import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  text = '';

  constructor(public testService: TestService) {}

  ngOnInit(): void {}

  getHelloWorld() {
    this.testService.getHelloWorld().subscribe((res) => {
      console.log(res);
      this.text = res;
    });
  }
}
