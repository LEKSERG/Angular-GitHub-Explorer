import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'search', component: SearchComponent },
  {path: 'search/:user', component: SearchComponent },
  {path: 'details/:userlogin', component: DetailsComponent },
  {path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
