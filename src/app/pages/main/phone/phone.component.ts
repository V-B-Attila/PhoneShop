import {Component, Input, OnInit} from '@angular/core';
import {Phone} from "../../../shared/model/Phone";
import {PhoneService} from "../../../shared/services/phone.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
  @Input() phone!: Phone;
  inputMode: boolean = false;
  editForm!: FormGroup;

  constructor(private phoneService: PhoneService) {

  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      name: new FormControl(this.phone?.name, Validators.compose([Validators.required])),
      storage: new FormControl(this.phone?.storage, [Validators.required]),
      price: new FormControl(this.phone?.price, [Validators.required]),
    });
  }

  deletePhone(phone: Phone) {
    this.phoneService.delete(phone.uid)
      .then(_ => {
        console.log(`Phone ${phone.name} deleted successfully!`);
      })
      .catch(error => {
        console.error(error);
      });
  }


  toggleInputMode() {
    this.inputMode = !this.inputMode;
  }

  savePhone(phone: Phone) {
    if (this.editForm.invalid) {
      console.error('Error occurred!')
      return;
    }

    phone.name = this.editForm.controls['name'].value;
    phone.storage = this.editForm.controls['storage'].value;
    phone.price = this.editForm.controls['price'].value;

    this.phoneService.update(phone)
      .then(_ => {
        console.log("Updated successful!");
    }).catch(error => {
        console.log(error);
      });
  }
}
