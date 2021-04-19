import { Injectable } from '@angular/core';
import { EgsOneToMany } from '../../abstract-classes/EgsOneToMany';
import { Agent } from '../../interfaces/Agent';

@Injectable({
  providedIn: 'root'
})
export class EgsStableMarriageService extends EgsOneToMany {

  group1Name = "man";
  group2Name = "woman";

  shouldContinueMatching(currentAgent: Agent): boolean {
      return true;
  }

  getNextPotentialProposee(currentAgent: Agent): Agent {
      return currentAgent.ranking[0];
  }
  
}
