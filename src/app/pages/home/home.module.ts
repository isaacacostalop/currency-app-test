import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Route, RouterModule } from '@angular/router';
import { CurrencyTableComponent } from './components/currency-table/currency-table.component';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [HomeComponent, CurrencyTableComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class HomeModule {}
