import { Component, OnInit } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private http:Http) { }
  confirmationString:string = "新入社員追加";
  isAdded: boolean = false;
  employeeObject:object = {};

  addNewEmployee = function(employee){
    this.employeeObject = {
      "name": employee.name,
      "position": employee.position,
    }
    this.http.post("http://localhost:3333/employees/",this.employeeObject).subscribe((res:Response)=> {
      this.isAdded = true;
    }) 
  }

  ngOnInit(): void {
  }

}
