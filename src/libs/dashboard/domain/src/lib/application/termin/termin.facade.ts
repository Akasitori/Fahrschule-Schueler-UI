import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TerminIdAndStatusOnly, Termine } from "../../entities/termin/termin";
import { TerminService } from "../../infrastructure/termin/termin.service";

@Injectable({
    providedIn: 'root'
})
export class TerminFacade
{
    private todayStartDate = new Date(); 
    private todayEndDate = new Date();

    private terminBySchuelerIdSubject = new BehaviorSubject<Termine>({value:[]});
    public terminBySchuelerId$ = this.terminBySchuelerIdSubject.asObservable();

    private termineForTodayBySchuelerIdSubject = new BehaviorSubject<Termine>({value:[]});
    public termineForTodayBySchuelerId$ = this.termineForTodayBySchuelerIdSubject.asObservable();

    private patchedTerminStatusSubject = new BehaviorSubject<TerminIdAndStatusOnly | null>(null);
    public patchedTerminStatus$ = this.patchedTerminStatusSubject.asObservable();

    constructor(private terminService: TerminService){}

    getTermineBySchuelerId(schuelerId: string, beginn: Date, ende: Date){
        this.terminService.getTermineBySchuelerId(schuelerId, beginn, ende).subscribe({
            next: data => {
                this.terminBySchuelerIdSubject.next(data);
            }
        });
    }

    getTermineForTodayBySchuelerId(schuelerId: string){
        this.todayStartDate.setHours(0,0,0,0);
        this.todayEndDate.setHours(23,59,59,999);
        this.terminService.getTermineBySchuelerId(schuelerId, this.todayStartDate, this.todayEndDate).subscribe({
            next: data => {
                this.termineForTodayBySchuelerIdSubject.next(data);
            }
        });
    }

    patchTerminStatus( terminId: string, terminStatus: string){
        const terminIdAndStatusOnly : TerminIdAndStatusOnly = {id: terminId, terminStatus: terminStatus};

        this.terminService.patchTerminStatus(terminIdAndStatusOnly).subscribe({
            next: data => {
                this.patchedTerminStatusSubject.next(data);
            }
        });
    }

}