import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Lehrer } from "../../entities/lehrer/lehrer";
import { LehrerService } from "../../infrastructure/lehrer/lehrer.service";

@Injectable({
    providedIn: "root"
})

export class LehrerFacade{

    constructor(
        private lehrerService: LehrerService
    ){}

    private lehrerByIdSubject = new BehaviorSubject<Lehrer | null>(null);
    public lehrerById$ = this.lehrerByIdSubject.asObservable();

    getLehrerById(id: string): void {
        this.lehrerService.getLehrerById(id).subscribe({
            next: (data) => {
                this.lehrerByIdSubject.next(data);
            }
        });
    }
    
}