import { Injectable } from "@angular/core";
import { SchuelerService } from "../../infrastructure/schueler/schueler.service";
import { AktualisierterSchueler, Schueler} from "../../entities/schueler/schueler";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class SchuelerFacade{

    constructor(
        private schuelerService: SchuelerService
    ){}

    private schuelerByIdSubject = new BehaviorSubject<Schueler | null>(null);
    public schuelerById$ = this.schuelerByIdSubject.asObservable();

    getSchuelerById(id: string): void {
        this.schuelerService.getSchuelerById(id).subscribe({
            next: (data) => {
                this.schuelerByIdSubject.next(data);
            }
        })
    }


    private updateSchuelerSubject = new BehaviorSubject<AktualisierterSchueler | null>(null);
    public updatedSchueler$ = this.updateSchuelerSubject.asObservable();

    updateSchueler(resource: AktualisierterSchueler): void {
        this.schuelerService.updateSchueler(resource).subscribe({
            next: (data) => {
                this.updateSchuelerSubject.next(data);
            }
        })
    }

}