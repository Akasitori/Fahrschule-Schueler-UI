import { NgModule } from '@angular/core';
import { FeatureSchuelerDatenComponent } from './feature-schueler-daten.component';
import { SchuelerDatenRouterModule } from './feature-schueler.routes';

//Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports:[
        SchuelerDatenRouterModule,
        
        //Material
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,

        ReactiveFormsModule,
        CommonModule
    ],
    
    declarations:[
        FeatureSchuelerDatenComponent,
    ]
})

export class FeatureSchuelerModule {}