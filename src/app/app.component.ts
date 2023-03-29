import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'test';

  form: FormGroup = this.fb.group({
    test: [null, Validators.required],
  });

  regex =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=+\\-^$*.\\[\\]{}()?"!@#%&/\\,><\':;|_~`]){8,99}';
  regex2 = '^[0-9].{10}+$';
  regex3 = '/^[0-9].{10}$/';
  alphabeticRegex = '^[A-Z|a-z]+$';
  numericRegex = '^[0-9]+$';

  constructor(private fb: FormBuilder) {}

  onSubmit(){
    console.log(this.form.value);
  }
}
