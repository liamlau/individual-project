import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlgorithmRetrievalService } from '../algorithm-retrieval.service';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmGuard implements CanActivate {

  constructor(public algorithmService: AlgorithmRetrievalService, private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.algorithmService.currentAlgorithm) {
      return true; 
    }

    this._router.navigate(['/']);
    return false;

  }
  
}
