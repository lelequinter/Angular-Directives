import { Component, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExpandibleComponent } from 'src/app/shared/components/expandible/expandible.component';

@Component({
  selector: 'app-expandible-view',
  templateUrl: './expandible-view.component.html',
  styleUrls: ['./expandible-view.component.css'],
})
export class ExpandibleViewComponent implements OnDestroy {
  @ViewChild('carsExpandible', {static : true}) carsExpandible : ExpandibleComponent = new ExpandibleComponent;
  @ViewChild('animalsExpandible', {static : true}) animalsExpandible : ExpandibleComponent = new ExpandibleComponent;

  carsList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  animalsList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  pushCar() {
    this.carsExpandible.callMe();
    this.carsExpandible.pushMethod({nombre: 'Audi R8', color: 'Blanco'})
  }

  pushAnimal() {
    this.animalsExpandible.callMe();
    this.animalsExpandible.pushMethod({nombre: 'Perro', color: 'Negro'})
  }

  ngOnDestroy(): void {
    this.carsList$.unsubscribe()
    this.animalsList$.unsubscribe()
  }
}
