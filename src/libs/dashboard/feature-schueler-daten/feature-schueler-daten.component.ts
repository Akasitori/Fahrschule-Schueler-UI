import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchuelerFacade } from '../domain/src/lib/application/schueler/schueler.facade';
import { LehrerFacade } from '../domain/src/lib/application/lehrer/lehrer.facade';
import { ActivatedRoute } from '@angular/router';
import { AktualisierterSchueler, Schueler } from '../domain/src/lib/entities/schueler/schueler';
import { DatePipe } from '@angular/common';
import { Lehrer } from '../domain/src/lib/entities/lehrer/lehrer';

@Component({
  selector: 'app-feature-schueler-daten',
  templateUrl: './feature-schueler-daten.component.html',
  styleUrls: ['./feature-schueler-daten.component.css']
})

export class FeatureSchuelerDatenComponent {
  
    vorname!: string;
    nachname!: string;
    lehrerName!: string;
  
    /*Inputs*/
    eingabeDeaktiviert = true;
    bearbeitenDeaktiviert = true;
  
    /*Knöpfe*/
    speichernInaktiv = true;
    bearbeitungsmodusAktiv = false;

    id!: string;
    defaultLehrerId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    lehrerById$ = this.lehrerFacade.lehrerById$;
    defaultSchuelerId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    schuelerById$ = this.schuelerFacade.schuelerById$;
    schuelerKontaktdatenFormular: FormGroup = new FormGroup({});
  
    constructor(
      private schuelerFacade: SchuelerFacade,
      private lehrerFacade: LehrerFacade,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute
    ){}
  
    ngOnInit(): void {
      this.leseSchuelerIdAusUrl();
      this.initialisiereFormular();
      this.holeSchuelerKontaktdatenVonDb();
      this.holeLehrerKontaktdatenVonDb();
    }
  
    leseSchuelerIdAusUrl() {
      /* this.id = this.route.snapshot.paramMap.get('id') ?? '';
      if (this.id !== ''){
        this.schuelerFacade.getSchuelerById(this.id);
      } */
      this.schuelerFacade.getSchuelerById(this.defaultSchuelerId);
    }
  
    initialisiereFormular(){
      this.schuelerKontaktdatenFormular = this.formBuilder.group({
        id:['', Validators.required],
        vorname: ['', Validators.required],
        nachname: ['', Validators.required],
        geburtsdatum: ['', Validators.required],
        geschlecht: ['', Validators.required],
        strasse: ['', Validators.required],
        hausNr: ['', Validators.required],
        stadt: ['', Validators.required],
        plz: ['', Validators.required],
        telnr: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        datumDerAnmeldung: ['', Validators.required],
        status: ['', Validators.required],
        fuehrerscheinklassen: ['', Validators.required],
        getriebeTyp: ['', Validators.required],
        lehrerName: ['', Validators.required]
      })
    }
  
    holeSchuelerKontaktdatenVonDb(){
      this.schuelerById$.subscribe({
        next: (data) => {
          if (data != null){
            this.setzeWerteImFormular(data);
            this.ladeVornameUndNachnameDesSchuelers(data);
            this.ladeVornameUndNachnameDesLehrersDurchLehrerId(data.lehrerId!);
          }
        }
      })
    }
  
    setzeWerteImFormular(data: Schueler) {
      const geburtsdatum = this.aendereDatumZuKurzemDatum(data.geburtsdatum);
      const datumDerAnmeldung = this.aendereDatumZuKurzemDatum(data.datumDerAnmeldung);
      this.schuelerKontaktdatenFormular.patchValue({
        id: this.defaultSchuelerId,
        vorname: data.vorname,
        nachname: data.nachname,
        geburtsdatum: geburtsdatum,
        geschlecht: data.geschlecht,
        strasse: data.adresse.strasse,
        hausNr: data.adresse.hausNr,
        stadt: data.adresse.stadt,
        plz: data.adresse.plz,
        telnr: data.kontaktdaten.tel,
        email: data.kontaktdaten.email,
        datumDerAnmeldung: datumDerAnmeldung,
        status: data.status,
        fuehrerscheinklassen: data.fuererscheinklasse,
        getriebeTyp: data.getriebeTyp,
      })
    }
  
    aendereDatumZuKurzemDatum(datum: string | Date): string | null{
      const datePipe = new DatePipe('de-DE');
      return datePipe.transform(datum, 'MM/dd/yyyy');
    }
  
    ladeVornameUndNachnameDesSchuelers(data: Schueler){
      this.vorname = data.vorname;
      this.nachname = data.nachname;
    }
  
    ladeVornameUndNachnameDesLehrersDurchLehrerId(lehrerId: string){
      this.lehrerFacade.getLehrerById(lehrerId);
      this.holeLehrerKontaktdatenVonDb();
    }
  
    holeLehrerKontaktdatenVonDb(){
      this.lehrerById$.subscribe({
        next: (data) => {
          if (data != null){
            this.setzeVornameUndNachnameDesLehrers(data);
            this.schuelerKontaktdatenFormular.patchValue({
              lehrerName: this.lehrerName
            })
          }
        }
      })
    }
  
    setzeVornameUndNachnameDesLehrers(data: Lehrer){
      this.lehrerName = data.vorname + ' ' + data.nachname;
    }

    bearbeitungAktivieren(){
      this.bearbeitenDeaktiviert = false;
      this.bearbeitungsmodusAktiv = true;
    }
  
    bearbeitungDeaktivieren(){
      this.bearbeitenDeaktiviert = true;
      this.bearbeitungsmodusAktiv = false;
    }
  
    speichernKontaktdaten(){
      const formWerte = this.schuelerKontaktdatenFormular.value;
      const aktualisierterSchueler: AktualisierterSchueler = {
        id: this.defaultSchuelerId,
        vorname: formWerte.vorname,
        nachname: formWerte.nachname,
        adresse:{
          strasse: formWerte.strasse,
          hausNr: formWerte.hausNr,
          stadt: formWerte.stadt,
          plz: formWerte.plz,
        },
        kontaktdaten: {
          tel: formWerte.telnr,
          email: formWerte.email,
        }
      }
  
      this.schuelerFacade.updateSchueler(aktualisierterSchueler);
      this.bearbeitungDeaktivieren();
    }

}