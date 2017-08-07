import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
// import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
	{
		path: '',
		// component:LoginComponent,
		redirectTo: 'login',pathMatch: 'full'
	},
	{
		path:'login',
		component:LoginComponent
	},
	{
		path: 'home',
		component: HomePageComponent
	},
	{
		path: 'app',
		loadChildren: './main/main.module#MainModule'
	}
];



@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})

export class AppRoutesModule { }

