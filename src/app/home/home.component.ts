import { Component, OnInit } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
//import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: Http) { }
  id: number;
  private header = new Headers({'Content-Type': 'application/json'});

  employees = [];
  fetchData = function() {
    this.http.get("http://localhost:3333/employees").subscribe(
      (res: Response) =>{
        this.employees = res.json();
        console.log(this.employees);
      }
    )
  }

  deleteEmployee = function(id) {
    if(confirm("削除しますか？")){
      const url = `${"http://localhost:3333/employees"}/${id}`;
      return this.http.delete(url,{headers: this.headers}).toPromise()
      .then(() =>{
        this.fetchData();
      })
    }
  }

  ngOnInit() {
    this.fetchData();
  }

}
