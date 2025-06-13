import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelDashboardComponent } from './booking/components/travel-dashboard/travel-dashboard.component';

const routes: Routes = [
  { path: '', component: TravelDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
