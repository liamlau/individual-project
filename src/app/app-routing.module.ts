import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlgorithmGuard } from './algorithm-guard';
import { AlgorithmPageComponent } from './algorithm-page/algorithm-page.component';
import { HomePageComponent } from './home-page/home-page.component';


const routes: Routes = [
  { path: '', component: AlgorithmPageComponent },
  { path: 'algorithm', component: AlgorithmPageComponent, canActivate: [AlgorithmGuard] },
  { path: '**', component: HomePageComponent },  // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
