import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmSelectionDialogComponent } from './algorithm-selection-dialog.component';

describe('AlgorithmSelectionDialogComponent', () => {
  let component: AlgorithmSelectionDialogComponent;
  let fixture: ComponentFixture<AlgorithmSelectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmSelectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
