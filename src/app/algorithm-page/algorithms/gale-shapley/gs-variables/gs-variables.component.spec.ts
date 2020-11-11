import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsVariablesComponent } from './gs-variables.component';

describe('GsVariablesComponent', () => {
  let component: GsVariablesComponent;
  let fixture: ComponentFixture<GsVariablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsVariablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
