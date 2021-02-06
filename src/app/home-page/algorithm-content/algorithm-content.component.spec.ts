import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmContentComponent } from './algorithm-content.component';

describe('AlgorithmContentComponent', () => {
  let component: AlgorithmContentComponent;
  let fixture: ComponentFixture<AlgorithmContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
