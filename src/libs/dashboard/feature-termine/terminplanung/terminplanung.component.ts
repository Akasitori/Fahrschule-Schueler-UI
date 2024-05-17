import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import * as moment from 'moment';
import { TerminFacade } from 'src/libs/dashboard/domain/src/lib/application/termin/termin.facade';

@Component({
  selector: 'app-terminplanung',
  templateUrl: './terminplanung.component.html',
  styleUrls: ['./terminplanung.component.css']
})
export class TerminplanungComponent {

  terminBySchuelerId$ = this.terminFacade.terminBySchuelerId$;

  dateList : string[] = [];

  panelOpenState = false;
  currentDate = new Date();
  startDatum = moment(this.currentDate).startOf('isoWeek').toDate();
  endDatum = moment(this.currentDate).endOf('isoWeek').toDate();

  selectedDateRange: { startDate: Date | null, endDate: Date | null} = { startDate: this.startDatum, endDate: this.endDatum };

  beginn = "09:00";
  ende = "10:30";

  defaultSchuelerId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

  constructor(private terminFacade: TerminFacade)
  {
    this.fillDateList();
    this.terminFacade.getTermineBySchuelerId(this.defaultSchuelerId, this.startDatum, this.endDatum);
  }

  onDateRangeSelected(event: { startDate: Date | null, endDate: Date | null }) {
    this.selectedDateRange = event;
    if(this.selectedDateRange.startDate && this.selectedDateRange.endDate){
      this.terminFacade.getTermineBySchuelerId(this.defaultSchuelerId, this.selectedDateRange.startDate, this.selectedDateRange.endDate);
    }
    this.fillDateList();
  }

  private fillDateList(){
    this.dateList = [];
    if(this.selectedDateRange.startDate && this.selectedDateRange.endDate){
      let loop = new Date(this.selectedDateRange.startDate);
      while (loop <= this.selectedDateRange.endDate) {
        this.dateList.push(formatDate(loop, "yyyy-MM-dd", "en-Us"));
        loop = new Date(loop);
        loop.setDate(loop.getDate() + 1);
      }
    }
  }

  isDateInRange(date: string, beginn: Date, ende: Date): boolean {
    const maxDate = new Date(Date.parse("9999-12-31T23:59:59"));
    const einsatzBeginnOhneZeit = formatDate(beginn, "yyyy-MM-dd", "en-Us");
    const einsatzEndeOhneZeit = formatDate(
      ende ? ende : maxDate,
      "yyyy-MM-dd",
      "en-Us"
    );
    return date >= einsatzBeginnOhneZeit && date <= einsatzEndeOhneZeit;
  }

  isToday(date: string, terminBeginn: string) : boolean
  {
    if(this.selectedDateRange.startDate != null && this.selectedDateRange.endDate != null){

    const terminDateWithoutTIme = formatDate(terminBeginn, "yyyy-MM-dd", "en-Us");
    const iteratedDate = formatDate(date, "yyyy-MM-dd", "en-Us")
    if(iteratedDate === terminDateWithoutTIme)
    {return true;}
      else{return false;}
    }
    else{return false;}
  }

}
