import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgsResidentHsCodeComponent } from './egs-resident-hs-code.component';

describe('EgsResidentHsCodeComponent', () => {
  let component: EgsResidentHsCodeComponent;
  let fixture: ComponentFixture<EgsResidentHsCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgsResidentHsCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgsResidentHsCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
