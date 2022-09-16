import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  cardStatus: boolean = false;
  debtStatus: boolean = false;
  valueStatus: boolean = false;
  absentData : boolean = false;
  showEstimate: any;

  constructor(private userdataService: UserdataService, private authService: AuthService , private route:Router) { }

  ngOnInit(): void {
  }
  onSubmit(data: any) {
   
    let tempData = this.userdataService.getValue();
    tempData['debtValue'] = data
    this.authService.sendDebt(tempData).subscribe((res: any) => {
      if (res.success) {
        this.cardStatus = true
        this.valueStatus = true
        this.debtStatus = true;
        this.showEstimate = res;
      }
      if (res.success==false)
      {
        this.absentData = true;
        this.cardStatus = false;
        this.debtStatus =true;
      }

    });
  }
  onBack(){
    this.route.navigateByUrl('contact');
  }
}
