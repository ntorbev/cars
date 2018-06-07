import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { CarsService } from 'src/app/core/cars.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchInput: FormControl = new FormControl('');
  cars = [];

  constructor(private carsService: CarsService) {
  }

  ngOnInit(): void {
    this.searchInput.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged())
      .subscribe(value => {
          this.cars.length = 0;
          this.carsService.getData(value).subscribe(data => this.cars = data);
        }
      );
  }
}