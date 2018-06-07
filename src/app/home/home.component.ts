import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

import { CarsService } from 'src/app/core/cars.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchInput: FormControl = new FormControl('');
  cars = [];
  showNoResults: boolean;

  constructor(private carsService: CarsService) {
  }

  ngOnInit(): void {
    this.searchInput.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map((val: string) => {
        if (val.length === 1) {
          this.cars.length = 0;
        }
        return val;
      }),
      filter((val: string) => (val.length > 1)))
      .subscribe(value => {
          this.cars.length = 0;
          this.carsService.getData(value).subscribe(data => {
              this.cars = data;
              this.showNoResults = false;
            },
            error => {
              console.log(error);
              this.showNoResults = true;
            });
        }
      );
  }
}
