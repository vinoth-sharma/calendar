
    monthList = [
      ['JAN', 'FEB', 'MAR', 'APR'],
      ['MAY', 'JUN', 'JUL', 'AUG'],
      ['SEP', 'OCT', 'NOV', 'DEC']
  ]

  yearList = [
      [],
      [],
      [],
      []
  ];

  todayDate = moment().format();

  //  currentMonth = moment().month();
  //  currentDate = moment().date();
  currentYear;
  curentDay;
  currentDays;
  startDay;
  
  baseArray = [];
  yearRange:string = '';
  //  groupedArray = [];
  show;


  showDatePicker: boolean = true;
  showYears: boolean = false;
  showMonths: boolean = false;

  year = {
      start: null
  };

  selectedMY = {
      month : null,
      year  : null
  }
  ngOnInit() {
      let diff = (new Date(0)).getTime() - (new Date()).getTime();
      let a = new Date((Math.random() * 1e15) % diff)


      this.curentDay = moment(this.todayDate).day();
      
      this.show = moment(this.todayDate).format('MMM YYYY');
      
      this.startDay = moment(this.todayDate).startOf('month').day();
      this.currentDays = moment(this.todayDate).daysInMonth();
      this.currentYear = moment(this.todayDate).year();

      this.year.start = this.currentYear;
      
      this.yearsCollector();
      console.log(this.startDay);
      
      this.arrayOfDays();




      console.log(this.startDay);
      console.log(this.yearList);

      console.log(this.baseArray);

  }

  arrayOfDays(){
      this.baseArray.length = 42;
      this.baseArray.fill('');

      for (let i = 1; i <= this.currentDays; i++) {
          this.baseArray[i - 1] = i;
      }

      this.baseArray = [...(new Array(this.startDay)).fill(''), ...this.baseArray];

  }
  yearsCollector() {
      for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
              this.year.start += 1;
              this.yearList[i].push(this.year.start);                
          }
      }
      this.yearRange = this.year.start -15 + '-' +this.year.start

  }

  previousYears() {
      this.yearList = this.yearList.map(ele=>[]);      
      this.year.start = this.year.start - 31;
      this.yearsCollector();
  }

  nextYears() {
      this.yearList = this.yearList.map(ele=>[]);      
      this.yearsCollector();
  }

  showYearView() {
      this.showDatePicker = false;
      this.showYears = true;
  }
  backToCalendar(){
      this.showYears = false;
      this.showMonths = false;               
      this.showDatePicker = true;
  }
  yearSelected(year){
      this.selectedMY.year = year;
      this.showYears = false;
      this.showMonths = true;        
  }
  monthSelected(i,j){

      this.selectedMY.month = i*4 + j+1;
      this.showMonths = false;       
      this.showDatePicker = true;
      console.log(this.selectedMY);

      this.startDay = moment(this.selectedMY.year+'-'+this.selectedMY.month,'YYYY-MM').startOf('month').day();
      this.currentDays = moment(this.selectedMY.year+'-'+this.selectedMY.month,'YYYY-MM').daysInMonth();

      this.arrayOfDays();
      console.log(this.currentDays);
      
  }
}