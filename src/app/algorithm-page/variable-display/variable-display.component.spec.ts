import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableDisplayComponent } from './variable-display.component';

describe('VariableDisplayComponent', () => {
  let component: VariableDisplayComponent;
  let fixture: ComponentFixture<VariableDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
