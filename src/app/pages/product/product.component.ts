import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { Product } from "src/app/models/product";
import { ProductsApiService } from "src/app/services/products-api.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  productName: string = "";
  prod!: Product;
  /*prodSub$: Subject< Product> = new Subject<Product>()*/

  constructor(
    private route: ActivatedRoute,
    private prodAPiService: ProductsApiService,
    private router : Router,
    private  snack : MatSnackBar
  ) {}

  ngOnInit(): void {
    /*this.productName = this.route.snapshot.paramMap.get('name') || '' rota pai*/
    this.route.paramMap.subscribe((paramMap) => {
      this.productName = paramMap.get("name") || ""; /* rota filha*/

      this.prodAPiService
        .findByProductName(this.productName)
        .subscribe((product)=> {
          this.prod = product
        }); /* requisição a api*/
     }
    );
    /*this.prodAPiService.findAll().subscribe;*/
  }

  delete(id:number): void {
    this.prodAPiService.deleteProduct(id).subscribe(
      () => {
          this.snack.open('Produto excluído','Fechar')
          this.router.navigateByUrl('/home')
      }
    )
  }
  edit(): void {
    this.router.navigateByUrl(`/update?/id=${this.prod.id}&name=${this.prod.name}&price=${this.prod.price}&picture=${this.prod.picture}`)/*query param*/
  }
}
