import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private myData: any;

  constructor(private http: HttpClient) {
  }

  getData(search: string): Observable<any> {
    const results = 7;
    // https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=16&solrTerm=sofia
    return this.http.get(`https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${results}&solrTerm=${search}`)
      .pipe(map((data: any) => this.myData = data.results.docs));
  }
}
