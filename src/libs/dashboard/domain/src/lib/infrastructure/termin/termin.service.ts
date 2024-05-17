import { Observable } from "rxjs";
import { Termin, TerminIdAndStatusOnly, Termine } from "../../entities/termin/termin";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class TerminService{
    
    constructor(
        private httpClient: HttpClient
    ){}

    getTermineBySchuelerId(schuelerId: string, beginn: Date, ende: Date) : Observable<Termine>{
        const url = ["https://localhost:7148", 'termin', 'getTermineBySchuelerId', schuelerId].join('/');
        const headers = new HttpHeaders().set('Application', 'application/json');
        const params = new HttpParams()
        .set('beginn', beginn.toISOString())
        .set('ende', ende.toISOString());
        const requestOptions = { headers, params };
        return this.httpClient.get<Termine>(url, requestOptions);
    }


    patchTerminStatus(terminIdAndStatusOnly : TerminIdAndStatusOnly) : Observable<TerminIdAndStatusOnly>{
        const url = ["https://localhost:7148", 'termin', 'patchTerminStatus'].join('/');
        const headers = new HttpHeaders().set('Application', 'application/json');
        const body = terminIdAndStatusOnly;
        const requestOptions = { headers };
        return this.httpClient.patch<TerminIdAndStatusOnly>(url, body,requestOptions);
    }

}