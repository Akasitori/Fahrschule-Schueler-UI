import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Lehrer } from "../../entities/lehrer/lehrer";

@Injectable({
    providedIn: 'root'
})

export class LehrerService{

    constructor(
        private httpClient: HttpClient
    ){}

    getLehrerById(id: string): Observable<Lehrer>{
        const url = ["https://localhost:7148", 'lehrer', 'getLehrerById', id].join('/');
        const headers = new HttpHeaders().set('Application','application/json');
        const requestOptions = {headers};
        return this.httpClient.get<Lehrer>(url,requestOptions);
    }
}

