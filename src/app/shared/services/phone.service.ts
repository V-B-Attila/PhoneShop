import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../model/User";
import {Phone} from "../model/Phone";
import {phones} from "../constants/phones";

@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  collectionName = 'Phones';

  constructor(private afs: AngularFirestore) {
  }

  create(phone: Phone) {
    phone.uid = this.afs.createId();
    return this.afs.collection<Phone>(this.collectionName).doc(phone.uid).set(phone);
  }

  getAll() {
    return this.afs.collection<Phone>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<Phone>(this.collectionName).doc(id).valueChanges();
  }

  update(phone: Phone) {
    return this.afs.collection<Phone>(this.collectionName).doc(phone.uid).set(phone);
  }

  delete(uid: string) {
    return this.afs.collection<Phone>(this.collectionName).doc(uid).delete();
  }

  initPhones() {
    for (const phone of phones) {
      this.create(phone);
    }
  }
}
