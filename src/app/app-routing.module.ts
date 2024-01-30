import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInfrmationComponent } from './user-infrmation/user-infrmation.component';

const routes: Routes = [
  { path: '', redirectTo: '/userinfo', pathMatch: 'full' },
  { path: 'userinfo', component: UserInfrmationComponent },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
