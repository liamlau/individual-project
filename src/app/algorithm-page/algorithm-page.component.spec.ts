import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmPageComponent } from './algorithm-page.component';

describe('AlgorithmPageComponent', () => {
  let component: AlgorithmPageComponent;
  let fixture: ComponentFixture<AlgorithmPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
