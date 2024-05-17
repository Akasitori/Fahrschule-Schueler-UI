import { Component } from '@angular/core';
import { LehrerFacade } from 'src/libs/dashboard/domain/src/lib/application/lehrer/lehrer.facade';
import { SchuelerFacade } from 'src/libs/dashboard/domain/src/lib/application/schueler/schueler.facade';
import { TerminFacade } from 'src/libs/dashboard/domain/src/lib/application/termin/termin.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentDate = new Date();
  beginn = "09:00";
  ende = "10:30";

  schuelerVorname = "";
  schuelerNachname ="";

  lehrerVorname = "";
  lehrerNachname = "";

 
  lehrerById$ = this.lehrerFacade.lehrerById$;
  schuelerById$ = this.schuelerFacade.schuelerById$;
  termineForTodayBySchuelerId$ = this.terminFacade.termineForTodayBySchuelerId$;

  defaultLehrerId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  defaultSchuelerId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  

  constructor(
    private terminFacade: TerminFacade,
    private lehrerFacade: LehrerFacade,
    private schuelerFacade: SchuelerFacade){

      this.schuelerById$.subscribe({
        next: (data) => {
          if(data != null){
            this.schuelerVorname = data.vorname;
            this.schuelerNachname = data.nachname;
          }
        }
      });

      this.lehrerById$.subscribe({
        next: (data) => {
          if(data != null){
            this.lehrerVorname = data.vorname;
            this.lehrerNachname = data.nachname;
          }
        }
      });

      terminFacade.getTermineForTodayBySchuelerId(this.defaultSchuelerId);
      lehrerFacade.getLehrerById(this.defaultLehrerId);
      schuelerFacade.getSchuelerById(this.defaultSchuelerId);
  }
  
}
