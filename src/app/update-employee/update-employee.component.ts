import { Component, OnInit } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  id: number;
  data:object = {};
  employees= [];
  employeeObject: object = {};
  exist = false;  
  private headers= new Headers({'Content-Type': 'application/json'});

  constructor(private router:Router,private route: ActivatedRoute,private http: Http) { }

  updateEmployee(employee){
    this.employeeObject = {
      "name": employee.name,
      "position": employee.position
    };
    const url = `${"http://localhost:3333/employees"}/${this.id}`;
    this.http.put(url,JSON.stringify(this.employeeObject), {headers: this.headers})
     .toPromise()
     .then(() => {
      this.router.navigate(['/']);
     })
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.http.get("http://localhost:3333/employees").subscribe(
      (res: Response) =>{
        this.employees = res.json();
        for(var i = 0;i < this.employees.length; i++){
          if(parseInt(this.employees[i].id) === this.id){
            this.exist = true;
            this.data = this.employees[i];
            console.log(this.data);
            
            break;
          }else{
            this.exist = false;
          }
        }
      }
    )
  }

}
