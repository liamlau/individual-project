import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlgorithmSelectionDialogComponent } from './algorithm-selection-dialog/algorithm-selection-dialog.component';

@Component({
  selector: 'algorithm-tab-content',
  templateUrl: './algorithm-tab-content.component.html',
  styleUrls: ['./algorithm-tab-content.component.scss']
})
export class AlgorithmTabContentComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AlgorithmSelectionDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
