import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleVariablesComponent } from './simple-variables.component';

describe('SimpleVariablesComponent', () => {
  let component: SimpleVariablesComponent;
  let fixture: ComponentFixture<SimpleVariablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleVariablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
