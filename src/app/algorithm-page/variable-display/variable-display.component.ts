import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'variable-display',
  templateUrl: './variable-display.component.html',
  styleUrls: ['./variable-display.component.scss']
})
export class VariableDisplayComponent implements OnInit {

  @Input() algorithm: string;

  constructor() { }

  ngOnInit(): void {
  }

}
