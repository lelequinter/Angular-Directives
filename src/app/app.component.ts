import { AfterViewInit, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'test';

  form: FormGroup = this.fb.group({
    test: [null, Validators.required],
    check: [false],
  });

  regex =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=+\\-^$*.\\[\\]{}()?"!@#%&/\\,><\':;|_~`]){8,99}';
  regex2 = '^[0-9].{10}+$';
  regex3 = '/^[0-9].{10}$/';
  alphabeticRegex = '^[A-Z|a-z]+$';
  numericRegex = '^[0-9]+$';

  beneficiaries_per_disease: number = 10;

  constructor(private fb: FormBuilder) {}

  ngAfterViewInit(): void {
    console.log('>>> add autocomplete false');
    let inputs = document.querySelectorAll('input');

    console.log('>> ', inputs);

    inputs.forEach( input => {
      input.setAttribute('autocomplete','none')
    } )
  }

  onSubmit(){
    console.log(this.form.value);

    const emptyObject = {
      name: ''
    };

    console.log('is empty?? ', _.isEmpty(emptyObject))

    for (const i of _.range(this.beneficiaries_per_disease)) {
      console.log('i >>', i)
    }
  }
  //* Cuando se envia un FormGroup
  // logForm(control: AbstractControl | null){
  //   console.log('control >>',control);
  // }

  //* Cuando se envia un FormGroup
  logForm(control: AbstractControl | null){
    console.log('control >>',control);
  }
}
