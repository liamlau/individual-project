import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgDescriptionComponent } from './alg-description.component';

describe('AlgDescriptionComponent', () => {
  let component: AlgDescriptionComponent;
  let fixture: ComponentFixture<AlgDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
