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
    const maxResults = 6;
    return this.http.get(`https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${maxResults}&solrTerm=${search}`)
      .pipe(
        map((data: any) => {
          if (data.results.docs[0].name === 'No results found') {
            throw new Error('NoResults');
          } else {
            this.myData = data.results.docs;
            return this.myData;
          }
        })
      );
  }
}
