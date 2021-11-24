import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  

  constructor(private httpClient: HttpClient) { }

/*
  let resp = this.http.get("dave");
  resp.subscribe((data)=>console.log(data));
*/
}
