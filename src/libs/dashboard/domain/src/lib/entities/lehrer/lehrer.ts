import { Adresse } from "../shared/adresse";
import { Kontaktdaten } from "../shared/kontaktdaten";

export interface Lehrer{
    id: string;
    vorname: string;
    nachname: string;
    geschlecht: string;
    geburtsdatum: string;
    adresse: Adresse;
    kontaktdaten: Kontaktdaten;
    fuererscheinklasse: string[];
    zertifizierterFahrlehrer: boolean;
}