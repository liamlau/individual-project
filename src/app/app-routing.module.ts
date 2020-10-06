import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlgorithmPageComponent } from './algorithm-page/algorithm-page.component';


const routes: Routes = [
  { path: '', component: AlgorithmPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
