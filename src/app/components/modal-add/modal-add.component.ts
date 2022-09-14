import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/UserModel';
import { DataStore } from 'src/app/services/data.store';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss']
})
export class ModalAddComponent implements OnInit {

  PATTERN_EMAIL = "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,63}";
  PATTERN_NAME = "^((?:[A-Za-zğüşöçıİĞÜŞÖÇ]+ ?){1,2})$";
  PATTERN_ONLY_NUMBERS = "^[0-9]*$";

  @ViewChild('closebutton') closebutton:ElementRef;

  contactForm: FormGroup<{
    firstname: FormControl<string>,
    lastname:FormControl<string>,
    email: FormControl<string>,
    phone: FormControl<string>,
  }>;

  constructor(
    private formBuilder: FormBuilder,
    private dataStore: DataStore) { }

  ngOnInit(): void {
    this.createContactForm();
  }

  createContactForm(){
    const params = {
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), Validators.pattern(this.PATTERN_NAME)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), Validators.pattern(this.PATTERN_NAME)]],
      email: ['', [Validators.required, Validators.maxLength(250), Validators.pattern(this.PATTERN_EMAIL)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.PATTERN_ONLY_NUMBERS)]],
    }

    this.contactForm = this.formBuilder.group(params);
  }

  saveForm() {
    if (this.contactForm.valid) {
      const params:IUser = {
      id: 9999,
      firstName: this.contactForm.value.firstname,
      lastName: this.contactForm.value.lastname,
      email: this.contactForm.value.email,
      phone:this.contactForm.value.phone,
      maidenName: "Doe",
      age: 18,
      gender: "male",
      username: "yunus",
      password: "123456",
      birthDate: "21.01.1995",
      image: "some image",
      bloodGroup: "AB",
      height: 65,
      weight: 75,
      eyeColor: "gray",
      hair: {color:"Blue", type:"curved"},
      domain: "Hetzner",
      ip: "121.125.121",
      address: {
        address: "Nuripasa Mah",
        city: "İstanbul",
        coordinates: {
          lat: 14.12312,
          lng: 13.123213,
        },
        postalCode: "34250",
        state: "Turkey",
      },
      macAddress: "123123546",
      university: "İstanbul University",
      bank: {
        cardExpire: "23.05.2025",
      cardNumber: "4456456845654789",
      cardType: "Master Card",
      currency: "Liras",
      iban: "456454567894564",
      },
      company: {
        address: {
          address: "Gokalp",
      city: "İstanbul",
      coordinates: {
        lat: 14.12312,
        lng: 13.123213,
      },
      postalCode: "34025",
      state: "Turkey",
        },
      department: "IT",
      name: "Software",
      title: "Fronted Developer",
      },
      ein: "1232123132",
      ssn: "213213545",
      userAgent: "John Doe",
      }
      console.log(params)
      this.dataStore.addUser(params);
      this.closebutton.nativeElement.click();
      // const result =  await this.membershipService.addContact(params);
      // if (result.error) {
      //   this.toastr.error("Sistemsel Hata!", 'İşlem Başarısız');
      // } else {
      //   this.toastr.success('Mesajınız gönderilmiştir!', 'İşlem Başarılı');
      //   this.contactForm.reset();
      // }
    }
  }

  resetForm() {
    this.contactForm.reset()
  }


}
