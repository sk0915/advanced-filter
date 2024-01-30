
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource, } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  screen_name: string;
  followers_count: number;
  following_count: number;
  location: string;
  verified: boolean;
  [key: string]: string | number | boolean;
}
interface Operator {
  key: string;
  prettyName: string;
}
interface FilterOption {
  prettyName: string;
  type: string;
  key: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Akil', screen_name: "Akil_inocent", followers_count: 12, following_count: 45, location: "Pondicherry ,PY", verified: true },
  { name: 'Akask', screen_name: "Akask_shan", followers_count: 12, following_count: 450, location: "Pondicherry ,PY", verified: true },
  { name: 'Lavanya', screen_name: "Lavanys_GoodGirl", followers_count: 45, following_count: 98, location: "Cuddalore,TN", verified: true },
  { name: 'Jothika', screen_name: "Jothi_ka", followers_count: 98, following_count: 753, location: "Nellai,TN", verified: true },
  { name: 'Saran', screen_name: "Saran_lyrics", followers_count: 500, following_count: 960, location: "Madurai,TN", verified: false },
  { name: 'Krishna', screen_name: "Krish.dotnet", followers_count: 120, following_count: 750, location: "Sivakasi,TN", verified: true },
  { name: 'Dhiviya', screen_name: "dhivya_flower", followers_count: 100, following_count: 780, location: "Chennai,TN", verified: false },
  { name: 'Mirthan', screen_name: "Mirthan_reels", followers_count: 87, following_count: 120, location: "Bangalore", verified: true },
  { name: 'Jeeva', screen_name: "Jeeva_developer", followers_count: 98, following_count: 954, location: "chennai,TN", verified: false },
  { name: 'Leela', screen_name: "Lavanys_GoodGirl", followers_count: 45, following_count: 98, location: "Cuddalore,TN", verified: true },
  { name: 'Manoji', screen_name: "Monoji_testing", followers_count: 85, following_count: 875, location: "Pondicherry,TN", verified: false },
  { name: 'Jothi', screen_name: "Jothi_cloud", followers_count: 98, following_count: 753, location: "vellore,TN", verified: true },
  { name: 'Shalinee', screen_name: "Shalinee_sales", followers_count: 550, following_count: 650, location: "Thirunallveli,TN", verified: true },
  
];


@Component({
  selector: 'app-user-infrmation',
  templateUrl: './user-infrmation.component.html',
  styleUrl: './user-infrmation.component.css'
})
export class UserInfrmationComponent implements OnInit {

  displayedColumns: string[] = ['name', 'screen_name', 'followers_count', 'following_count', 'location', 'verified'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  logicalOperator!: String;
  resultsLength = 0;
  showLogicalOperator: boolean = false;
  filteringData!: PeriodicElement[];
  applyFilterd(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }

  // Hard code Data  filter dropdown

  filterOptions: FilterOption[] = [
    { prettyName: 'Name', type: 'string', key: 'name' },
    { prettyName: 'Screen Name', type: 'string', key: 'screen_name' },
    { prettyName: 'Followers ', type: 'number', key: 'followers_count' },
    { prettyName: 'Following ', type: 'number', key: 'following_count' },
    { prettyName: 'Location', type: 'string', key: 'location' },
    { prettyName: 'Verified', type: 'boolean', key: 'verified' },
  ];

  // Hard code data opterors

  operators: Record<string, Operator[]> = {
    string: [
      { key: 'CONTAINS', prettyName: 'Contains' },
    ],
    number: [
      { key: 'GTE', prettyName: '>=' },
      { key: 'LTE', prettyName: '<=' },
    ],
    boolean: [
      { key: 'EQ', prettyName: 'Equals' },
    ],
  };

  options = [
    { value: 'AND', label: 'AND' },
    { value: 'OR', label: 'OR' },
  ];
  isVerified: boolean = false;
  userFilter!: FormGroup;
  selectedOpt: string = 'AND';

  constructor(private fb: FormBuilder) {
    this.userFilter = this.fb.group({
      conditions: this.fb.array([
        {
          "id": "name",
          "operator": "CONTAINS",
          "value": "",
          "logicalOperator": "AND"
        }
      ])
    });
    this.filteringData = ELEMENT_DATA;
   }

  ngOnInit() {
    this.userFilter = this.fb.group({
      conditions: this.fb.array([])
    });

  }
  onFilterKeyUp(event: Event, filter: any): void {
    this.applyFilters(ELEMENT_DATA, this.userFilter.value.conditions);
  }

  applyFilters(data: PeriodicElement[], filters: any[]): PeriodicElement[] {
    return data.filter((element) => {
      return filters.every((filter) => {
        const { id, operator, value } = filter;
        const elementValue = element[id];

        switch (operator) {
          case "GTE":
            return typeof elementValue === 'number' && typeof value === 'string'
              ? elementValue >= Number(value)
              : false;
          case "LTE":
            return typeof elementValue === 'number' && typeof value === 'string'
              ? elementValue <= Number(value)
              : false;
          case "EQ":
            return elementValue === value;

          default:
            return true;
        }
      });
    });

  }
  // applyFilter() {
   
  //   const filterConditions = this.userFilter.get('conditions') as FormArray;
  //   const filterObject = {}; 
  //   this.dataSource.filter = JSON.stringify(filterObject);

  // }

  filters(): FormArray {
    return this.userFilter.get('conditions') as FormArray;
  }

  newFilter(): FormGroup {
    return this.fb.group({
      id: '',
      operator: '',
      value: '',
      logicalOperator: 'AND'
    });
  }

  addFilter() {
    this.filters().push(this.newFilter());
    console.log(this.userFilter.value);
  }
  selectedOptionKey: any
  onFilterOptionChange(event: any) {
    console.log("EVENT : ",event);

    this.selectedOptionKey = event.target.value;

    console.log(this.selectedOptionKey);
    if (this.selectedOptionKey === '5: verified') {
      this.isVerified = true;
    } else {
      this.isVerified = false;
    }

  }

  removeRow(empIndex: number) {
    this.filters().removeAt(empIndex);
  }

  onSubmit() {
    const conditions = this.userFilter.value.conditions;
    this.filteringData = ELEMENT_DATA.filter(item => this.matchesConditions(item, conditions));
    console.log("Onsumbit data  ",this.filteringData)
    console.log("conditions data  ",conditions)

 
  }
  matchesConditions(item: any, conditions: any[]): boolean {
    const logicalOperator = conditions.find(condition => condition.id === 'logicalOperator')?.value || 'AND';
  
    const matches = conditions
      .filter(condition => condition.id !== 'logicalOperator')
      .map(condition => {
        const value = item[condition.id];
  
        switch (condition.operator) {
          case 'EQ':
            return value === condition.value;
          case 'NEQ':
            return value !== condition.value;
          case 'GT':
            return value > condition.value;
          case 'GTE':
            return value >= condition.value;
          case 'LT':
            return value < condition.value;
          case 'LTE':
            return value <= condition.value;
          case 'CONTAINS':
            return value.includes(condition.value);
          default:
            return true;
        }
      });
  
    // Apply logical operator
    if (logicalOperator === 'AND') {
      return matches.every(match => match);
    } else if (logicalOperator === 'OR') {
      return matches.some(match => match);
    } else {
      // Default to AND if an invalid logical operator is provided
      return matches.every(match => match);
    }
  }
  
  getOperators(): Operator[] {
    return Object.values(this.operators).flat();
  }

}