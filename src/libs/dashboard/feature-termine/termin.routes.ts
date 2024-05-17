import { RouterModule, Routes } from '@angular/router';
import { TerminplanungComponent } from './terminplanung/terminplanung.component';



const TERMINPLANUNG_ROUTES: Routes = [
    {
        path:'',
        component: TerminplanungComponent
    },

    {
        //wenn der Benutzer komische Adresse eingetragen hat, soll zur Home weitergeleitet werden
        path: '**',
        redirectTo: '' 
    },
]

export const TerminPlanungRouterModule = RouterModule.forChild(TERMINPLANUNG_ROUTES);