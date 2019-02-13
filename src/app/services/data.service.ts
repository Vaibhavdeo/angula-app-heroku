import { Injectable } from '@angular/core';
import { Http  } from '@angular/http';
import { Headers  } from '@angular/http';


@Injectable()
export class DataService {

  constructor(private url: string, private http: Http) { }

  getAll() {
    console.log("Inside get All methods",this.url + '/getAllDetails');
    var response = this.http.get(this.url + '/getAllDetails');
    console.log("get All Response", response);
    return this.http.get(this.url + '/getAllDetails');
  }

  create(resource) {
    const listDetails: any[] = [resource];
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/addGreetingDetails', JSON.stringify(listDetails), { headers: headers});
  }

  update(resource) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.url + '/updateDetails', JSON.stringify(resource),{ headers: headers});
  }

  delete(id) {

    return this.http.delete(this.url + '/deleteDetails/' + id);
  }

  getLatestEvents(){
    return this.http.get(this.url + '/getAllEvents');
  }

}

