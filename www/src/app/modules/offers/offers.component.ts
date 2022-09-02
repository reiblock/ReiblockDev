import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  cardStatus: boolean = false;
  valueStatus: boolean = false;
  showEstimate: any;

  constructor(private userdataService: UserdataService, private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(data: any) {
    this.cardStatus = true
    let tempData = this.userdataService.getValue();
    tempData['debtValue'] = data
    this.authService.sendDebt(tempData).subscribe((res: any) => {
      if (res) {
        this.valueStatus = true
        this.showEstimate = res;
      }
    });
  }

}
