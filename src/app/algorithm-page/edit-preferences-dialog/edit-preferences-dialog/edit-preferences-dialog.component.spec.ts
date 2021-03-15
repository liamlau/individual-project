import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { EditPreferencesDialogComponent } from './edit-preferences-dialog.component';

describe('EditPreferencesDialogComponent', () => {
  let component: EditPreferencesDialogComponent;
  let fixture: ComponentFixture<EditPreferencesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialog,
        MatDialogModule,
        MatDialogRef
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ],
      declarations: [ EditPreferencesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPreferencesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
