import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmTabContentComponent } from './algorithm-tab-content.component';

describe('AlgorithmTabContentComponent', () => {
  let component: AlgorithmTabContentComponent;
  let fixture: ComponentFixture<AlgorithmTabContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmTabContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
