import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'test';

  form: FormGroup = this.fb.group({
    test: ['null', Validators.required],
    check: [false],
    name: ['leyder'],
    apellido: ['quintero'],
  });

  regex =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=+\\-^$*.\\[\\]{}()?"!@#%&/\\,><\':;|_~`]){8,99}';
  regex2 = '^[0-9].{10}+$';
  regex3 = '/^[0-9].{10}$/';
  alphabeticRegex = '^[A-Z|a-z]+$';
  numericRegex = '^[0-9]+$';

  beneficiaries_per_disease: number = 10;

  ngAfterViewInit(): void {
    console.log('>>> add autocomplete false');
    let inputs = document.querySelectorAll('input');

    console.log('>> ', inputs);

    inputs.forEach((input) => {
      input.setAttribute('autocomplete', 'none');
    });
  }

  onSubmit() {
    console.log(this.form.value);

    const emptyObject = {
      name: '',
    };

    console.log('is empty?? ', _.isEmpty(emptyObject));

    for (const i of _.range(this.beneficiaries_per_disease)) {
      console.log('i >>', i);
    }
  }
  //* Cuando se envia un FormGroup
  // logForm(control: AbstractControl | null){
  //   console.log('control >>',control);
  // }

  //* Cuando se envia un FormGroup
  logForm(control: AbstractControl | null) {
    console.log('control >>', control);
  }

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    this.formList$.subscribe((_) => {
      this.expandableAnimation(true, 'content');
    });
  }

  ngOnDestroy(): void {
    this.formList$.unsubscribe();
  }

  formList: any[] = [];
  formList$ = new BehaviorSubject<any[]>([]);
  memoryFormList: any[] = [];

  bool: boolean = false;

  pushMethod() {
    this.formList$.next([...this.formList$.value, this.form.value]);
  }

  expandableAnimation(value: boolean, elementId: string) {
    let contentHeight = 0;
    const animationDelay = 0;
    const element: HTMLElement | null = document.getElementById(elementId);

    const children: HTMLCollection | never[] = document.getElementById(elementId)?.children || [];

    setTimeout(() => {
      Array.from(children).forEach((item: Element) => {
        const expandableItemMargin = 20;
        contentHeight += item.clientHeight + (expandableItemMargin * 2);
      });
      contentHeight += 20;
      if (value) {
        element?.style.setProperty('max-height', `${contentHeight}px`);
      } else {
        element?.style.setProperty('max-height', '0');
      }
    }, animationDelay);
  }

  deleteItem(elementId: string,index: number) {
    const cloneArray = _.cloneDeep(this.formList$.value);
    this.deleteItemAnimation(elementId,index);
    setTimeout(() => {
      cloneArray.splice(index, 1);
      this.formList$.next(cloneArray);
    }, 500);
  }

  deleteItemAnimation(elementId: string,index: number) {
    const mainElement: HTMLElement | null = document.getElementById(`${elementId}${index}`);
    mainElement?.style.setProperty('max-height', '0');
    mainElement?.style.setProperty('padding-top', '0');
    mainElement?.style.setProperty('padding-bottom', '0');
    mainElement?.style.setProperty('border', '0px dotted #757575');
    mainElement?.style.setProperty('margin-top', '0');
    mainElement?.style.setProperty('margin-bottom', '0');
    setTimeout(() => {
      mainElement?.style.setProperty('opacity', '0');
    }, 200);

    if( this.formList$.value.length !== index+1){
      const nextElement: HTMLElement | null = document.getElementById(`${elementId}${index-1}`);
      nextElement?.style.setProperty('margin-bottom', '0');
    }
  }
}
