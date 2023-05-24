import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-expandible',
  templateUrl: './expandible.component.html',
  styleUrls: ['./expandible.component.css']
})
export class ExpandibleComponent {
  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;

  @Input() array$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  @Input() contentName!: string;

  animationTransition: boolean = false;

  callMe() {
    console.log('Called : ' + this.contentName);
  }

  constructor() {
    // this.array$.subscribe((_) => {
    //   this.expandableAnimation(true, this.contentName);
    // });
  }

  ngOnDestroy(): void {
    this.array$.unsubscribe();
  }

  pushMethod(data: any) {
    if(!this.animationTransition) {
      this.array$.next([...this.array$.value, data]);
      this.expandableAnimation(true, this.contentName);
    }
  }

  deleteItem(index: number) {
    const elementId = this.contentName + 'item' + index
    this.animationTransition = true;
    const cloneArray = _.cloneDeep(this.array$.value);
    this.deleteItemAnimation(elementId,index);
    setTimeout(() => {
      cloneArray.splice(index, 1);
      this.array$.next(cloneArray);
      this.expandableAnimation(true, this.contentName);
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
