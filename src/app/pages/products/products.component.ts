import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsApiService } from 'src/app/services/products-api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  prodsSub$ : Subject < Product[]> = new Subject < Product[]>()

  constructor(
    private prodApiService: ProductsApiService
  ) { }

  ngOnInit(): void {
    this.prodApiService.findAll().subscribe(this.prodsSub$) 
  }

}
