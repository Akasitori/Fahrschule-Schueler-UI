import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'home',
    loadChildren: () => import('./home/home.module').then(_ => _.HomeModule)
  },

  {
    path:'fahrschuelerdaten',
    loadChildren: () => import('../libs/dashboard/feature-schueler-daten/feature-schueler.module').then(_ => _.FeatureSchuelerModule),
  },

  {
    path:'terminplanung',
    loadChildren: () => import('../libs/dashboard/feature-termine/termin.module').then(_ => _.TerminModule),
  },
  
  { 
    //wenn der Benutzer komische Adresse eingetragen hat, soll zur Home weitergeleitet werden
    path: '**', 
    redirectTo: 'home' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
