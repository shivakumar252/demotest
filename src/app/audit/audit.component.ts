import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Audit, User } from '@/_models';
import { AuditService, AuthenticationService } from '@/_services';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit
{
    audits = [];
    orderBy:boolean=false;
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = ELEMENT_DATA;
    currentUser:User;
    isDesc: boolean = false;
    column: string = 'ip';
    dummyColumns: string[] = [ 'empty-first', 'id', 'ip', 'user', 'loginTime', 'logoutTime'];
    twentyFourHourFormat:boolean=false;
    twelveHourFormat:boolean =true;
    constructor(
        private authenticationService: AuthenticationService,
        private auditService: AuditService,
      
    )
    {
        this.currentUser = this.authenticationService.currentUserValue;
     
      
    }

    ngOnInit()
    {
        this.loadAllAudits();
        
  
    }

    private loadAllAudits()
    {
        this.auditService.getAll()
            .pipe(first())
            .subscribe(
                (audits:any) => {
                    this.audits = audits;
                
                    console.log(this.audits);
                }
                    );
         
    }
    sortBy(property) {
        this.isDesc = !this.isDesc; //change the direction    
        this.column = property;
        let direction = this.isDesc ? 1 : -1;
    
        this.audits.sort(function (a, b) {
          if (a[property] < b[property]) {
            return -1 * direction;
          }
          else if (a[property] > b[property]) {
            return 1 * direction;
          }
          else {
            return 0;
          }
        });
      };
      onTimeFormatChange(event){
          console.log(event.srcElement.options.selectedIndex);
          if(event.srcElement.options.selectedIndex == 1){
            this.twelveHourFormat = false;
            this.twentyFourHourFormat =true;  
          }else{
            this.twelveHourFormat = true;
            this.twentyFourHourFormat =false;  
          }
  
      }
}