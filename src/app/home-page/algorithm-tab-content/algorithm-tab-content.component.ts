import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Algorithm } from './Algorithm';
import { AlgorithmRetrievalService } from './algorithm-retrieval.service';
import { AlgorithmSelectionDialogComponent } from './algorithm-selection-dialog/algorithm-selection-dialog.component';

@Component({
  selector: 'algorithm-tab-content',
  templateUrl: './algorithm-tab-content.component.html',
  styleUrls: ['./algorithm-tab-content.component.scss']
})
export class AlgorithmTabContentComponent implements OnInit {

  constructor(public dialog: MatDialog, public algorithmRetrieval: AlgorithmRetrievalService) {}

  ngOnInit(): void {
  }

  openDialog(algorithm: Algorithm) {
    const dialogRef = this.dialog.open(AlgorithmSelectionDialogComponent, {
      data: {
        algorithm: algorithm
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
