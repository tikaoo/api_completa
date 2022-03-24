import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {

  private readonly baseURL: string = 'http://localhost:3000/products'

  constructor(
    private http : HttpClient
  ) { }

  findAll(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseURL)
  }
  findByProductName(name:string): Observable<Product >{
    return this.http.get<Product[]>(`${this.baseURL}?name=${name}`).pipe(map(products =>{
      return products[0]
    }
    ))
  }
creatProduct(p:Product):Observable<any> {
  return this.http.post< any>( this.baseURL,p) /* salvar dados*/
}
deleteProduct(id:number): Observable<any> {
  return this.http.delete<any>(`${this.baseURL}/${id}`)
}
updateProduct(p:Product): Observable<any> {
  return this.http.put< any>(`${this.baseURL}/${p.id}`, p)
}

}
