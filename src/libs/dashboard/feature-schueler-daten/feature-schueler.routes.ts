import { RouterModule, Routes } from "@angular/router";
import { FeatureSchuelerDatenComponent } from "./feature-schueler-daten.component";

const SCHUELERDATEN_ROUTES: Routes = [
    {
        path:'',
        component: FeatureSchuelerDatenComponent
    },
    {
        //wenn der Benutzer komische Adresse eingetragen hat, soll zur Home weitergeleitet werden
        path: '**',
        redirectTo: ''
    }
]

export const SchuelerDatenRouterModule = RouterModule.forChild(SCHUELERDATEN_ROUTES); 