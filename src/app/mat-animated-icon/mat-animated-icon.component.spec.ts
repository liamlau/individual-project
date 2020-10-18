import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatAnimatedIconComponent } from './mat-animated-icon.component';

describe('MatAnimatedIconComponent', () => {
  let component: MatAnimatedIconComponent;
  let fixture: ComponentFixture<MatAnimatedIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatAnimatedIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatAnimatedIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
