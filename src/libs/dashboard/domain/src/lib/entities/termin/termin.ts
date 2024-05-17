export interface Termin
{
    id: string;
    beginn: Date;
    ende: Date;
    schuelerId: string;
    lehrerId: string;
    uebungsTyp: string;
    terminDauerInMinuten: number;
    terminStatus: string;
}

export interface Termine
{
    value: Termin[];
}

export interface TerminIdAndStatusOnly
{
    id: string,
    terminStatus: string;
}