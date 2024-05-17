import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AktualisierterSchueler, Schueler } from "../../entities/schueler/schueler";

@Injectable({
    providedIn: 'root'
})

export class SchuelerService{
    constructor(private httpClient: HttpClient){}
    
    getSchuelerById(id: string): Observable<Schueler>{
        const url = ["https://localhost:7148", 'schueler', 'getSchuelerById', id].join('/');
        const headers = new HttpHeaders().set('Application','application/json');
        const requestOptions = {headers};
        return this.httpClient.get<Schueler>(url,requestOptions);
    }

    updateSchueler(resource: AktualisierterSchueler){
        const url = ["https://localhost:7148", 'schueler', 'updateSchueler'].join('/');
        const body = resource;
        const headers = new HttpHeaders().set('Application','application/json');
        const requestOptions = {headers};
        return this.httpClient.put<AktualisierterSchueler>(url, body, requestOptions);
    }
}