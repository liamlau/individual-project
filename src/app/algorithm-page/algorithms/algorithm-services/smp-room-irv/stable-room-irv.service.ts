import { Injectable } from '@angular/core';
import { StableRoomMates } from '../../abstract-classes/StableRoomMates';
import { Agent } from '../../interfaces/Agent';
import { AlgorithmData } from '../../interfaces/AlgorithmData';
import { Man } from '../../interfaces/Man';

@Injectable({
  providedIn: 'root'
})
export class StableRoomIrvService extends StableRoomMates {

  constructor() { }
}
