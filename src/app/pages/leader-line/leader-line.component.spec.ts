import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderLineComponent } from './leader-line.component';

describe('LeaderLineComponent', () => {
  let component: LeaderLineComponent;
  let fixture: ComponentFixture<LeaderLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
