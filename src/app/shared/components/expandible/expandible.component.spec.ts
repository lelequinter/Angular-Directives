import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandibleComponent } from './expandible.component';

describe('ExpandibleComponent', () => {
  let component: ExpandibleComponent;
  let fixture: ComponentFixture<ExpandibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandibleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpandibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
