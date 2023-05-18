import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandibleViewComponent } from './expandible-view.component';

describe('ExpandibleViewComponent', () => {
  let component: ExpandibleViewComponent;
  let fixture: ComponentFixture<ExpandibleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandibleViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpandibleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
