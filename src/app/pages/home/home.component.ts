import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
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

  bool: boolean = false;

  formList$ = new BehaviorSubject<any[]>([]);
  animationTransition: boolean = false;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    this.formList$.subscribe((_) => {
      this.expandableAnimation(true, 'content');
    });
  }

  ngOnDestroy(): void {
    this.formList$.unsubscribe();
  }

  pushMethod() {
    if(!this.animationTransition) {
      this.formList$.next([...this.formList$.value, this.form.value]);
    }
  }

  deleteItem(elementId: string, index: number) {
    this.animationTransition = true;
    const cloneArray = _.cloneDeep(this.formList$.value);
    this.deleteItemAnimation(elementId,index);
    setTimeout(() => {
      cloneArray.splice(index, 1);
      this.formList$.next(cloneArray);
    }, 500);
  }

  expandableAnimation(value: boolean, elementId: string) {
    let contentHeight = 0; //* Expandable wrapper height
    const animationDelay = 0; //* Expandable animation delay (it must to be greater or equal to zero)
    const element: HTMLElement | null = document.getElementById(elementId); //* Expandable wrapper element
    const children: HTMLCollection | never[] = element?.children || []; //* Expandable wrapper children
    const expandableItemMargin = 20;  //* Margin between expandable items
    const expandableItemBorder = 2;   //* Sum of top and bottom border width

    //* If this method is called when delete an item then set instantly maxHeight
    this.animationTransition
    ? element?.style.setProperty('transition', '0ms ease-in-out')
    : element?.style.setProperty('transition', '500ms ease-in-out');
    this.animationTransition = false;

    setTimeout(() => {
      Array.from(children).forEach((item: Element) => {
        //* Calculating new expandable wrapper height
        contentHeight += item.clientHeight + expandableItemBorder;
      });

      if (value) {
        //* Setting the height of the expandable wrapper depending on its content if value is TRUE
        element?.style.setProperty('max-height', `${contentHeight + ( expandableItemMargin * (children.length + 1) )}px`);
      } else {
        //* Setting the height of the expandable wrapper to ZERO if value is FALSE
        element?.style.setProperty('max-height', '0');
      }
    }, animationDelay);
  }

  deleteItemAnimation(elementId: string,index: number) {
    const mainElement: HTMLElement | null = document.getElementById(`${elementId}${index}`);
    mainElement?.style.setProperty('max-height', '0');
    mainElement?.style.setProperty('padding-top', '0');
    mainElement?.style.setProperty('padding-bottom', '0');
    mainElement?.style.setProperty('border', '0px dotted #757575');
    mainElement?.style.setProperty('margin-top', '0');
    setTimeout(() => {
      mainElement?.style.setProperty('opacity', '0');
    }, 200);

    if(index == 0){
      mainElement?.style.setProperty('margin-bottom', '0');
    }

    if( index !== 0){
      const previousElement: HTMLElement | null = document.getElementById(`${elementId}${index-1}`);
      previousElement?.style.setProperty('margin-bottom', '0');
    }
  }
}
