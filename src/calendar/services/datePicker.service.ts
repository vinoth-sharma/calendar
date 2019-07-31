import { Injectable } from "@angular/core";
import { DateObj } from '../dataObj/dataObj.class';

@Injectable()
export class DatePicker {

    clickedDates = [];


    setSelectedDate(obj) {
        let data = new DateObj();
        data.date = obj.date;
        data.month = obj.month;
        data.year = obj.year;

        let selectedIndex = this.findLocation(data);
        if (selectedIndex >= 0) {
            this.clickedDates.splice(selectedIndex, 1)
        }
        else
         {   this.clickedDates.push(data);
         }
    }

    getSelectedDate(){
        return this.clickedDates;
    }

    findLocation(obj) {
        let index = -1;
        this.clickedDates.forEach((ele, i) => {
            if (ele.month === obj.month && ele.date === obj.date && ele.year === obj.year)
                index = i;
        })
        return index;
    }

}