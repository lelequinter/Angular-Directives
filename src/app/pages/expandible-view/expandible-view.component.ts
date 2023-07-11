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
    this.carsExpandible.pushMethod({nombre: 'Audi R8', color: 'Blanco', anio: 2022, motor: 'V8 Twin Turbo', precio: '120K USD'})
  }

  deleteCar(index: number){
    this.carsExpandible.deleteItem(index)
  }

  close(){
    this.carsExpandible.expandableAnimation(false,'Carros');
  }

  pushAnimal() {
    this.animalsExpandible.callMe();
    this.animalsExpandible.pushMethod({nombre: 'Lobo', color: 'Gris', edad: '5 años', habitat: 'Planicies, desiertos, tundras, taigas y bosques.'})
  }

  deleteAnimal(index: number){
    this.animalsExpandible.deleteItem(index)
  }

  ngOnDestroy(): void {
    this.carsList$.unsubscribe()
    this.animalsList$.unsubscribe()
  }
}
