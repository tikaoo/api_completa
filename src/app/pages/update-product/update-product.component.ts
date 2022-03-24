import { Component, OnInit } from '@angular/core';
import {  Validators, FormBuilder, FormGroup,FormControl} from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsApiService } from 'src/app/services/products-api.service';
import * as Validator from 'Validator'
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  productId !: any

  productForm : FormGroup =  this.fb.group({
    name: ['',[Validators.required]],
    price: ['',[Validators.required, Validators.min(1) ]],
    picture: ['',[Validators.required]]
  })

  constructor(
  private fb : FormBuilder,
  private route : ActivatedRoute,
  private router : Router,
  private snack: MatSnackBar,
  private prodApiService: ProductsApiService

  ) { }

  ngOnInit(): void {
   this.productId =  parseInt( this.route.snapshot.queryParamMap.get('id') || '') 

   let name = this.route.snapshot.queryParamMap.get('name')
   let price = this.route.snapshot.queryParamMap.get('price')
   let picture = this.route.snapshot.queryParamMap.get('picture')

   this.productForm.get('name')?.setValue('name')
   this.productForm.get('price')?.setValue('price')
   this.productForm.get('picture')?.setValue('picture')
  }

  saveProduct(): void{
    let picture = this.productForm.get('picture') as FormControl

    if(Validator.default.isURL(picture.value)){
      const product : Product = this.productForm.value

      product.id = this.productId
      
        this.prodApiService.updateProduct(product).subscribe(
          () => {
            /*this.router.navigateByUrl('/home')*/
            this.router.navigateByUrl(`/product/${this.productForm.get('name')?.value}`)
          },
          (error) => {
            this.snack.open('Houve um erro ao salvar o produto.Foi mal :(')
          }
        )
    }else {
      this.snack.open( 'Informa uma url válida!', 'Fechar')
      picture.setErrors({incorrect:true})

    }
  }
}
