import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmNavbarComponent } from './algorithm-navbar.component';

describe('AlgorithmNavbarComponent', () => {
  let component: AlgorithmNavbarComponent;
  let fixture: ComponentFixture<AlgorithmNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
