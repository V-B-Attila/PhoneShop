import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Phone} from "../../shared/model/Phone";
import {PhoneService} from "../../shared/services/phone.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  phones: Phone[] = [];

  telefonListener: any;

  constructor(private phoneService: PhoneService) {
    this.telefonListener = phoneService.getAll().subscribe((phones) => {
      this.phones = phones;
      console.log("Telefonok betöltése sikeresen!");

      if (phones.length === 0) {
        phoneService.initPhones();
      }
    })
  }

  ngOnDestroy() {
    this.telefonListener.unsubscribe();
  }

  ngOnInit(): void {
  }
}
