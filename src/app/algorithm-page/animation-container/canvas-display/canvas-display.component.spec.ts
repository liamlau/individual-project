import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasDisplayComponent } from './canvas-display.component';

describe('CanvasDisplayComponent', () => {
  let component: CanvasDisplayComponent;
  let fixture: ComponentFixture<CanvasDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
