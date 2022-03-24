import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsApiService } from 'src/app/services/products-api.service';
import * as Validator from 'Validator'

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

productForm : FormGroup =  this.fb.group({
  name: ['',[Validators.required]],
  price: ['',[Validators.required, Validators.min(1) ]],
  picture: ['',[Validators.required]]
})
  constructor(
    private fb: FormBuilder,
    private snack : MatSnackBar,
    private  prodApiService : ProductsApiService,
    private router : Router
  ) { }

  ngOnInit(): void {

  }
  saveProduct(): void{
    let picture = this.productForm.get('picture') as FormControl

    if(Validator.default.isURL(picture.value)){
      const product : Product = this.productForm.value
      
        this.prodApiService.creatProduct(product).subscribe(
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
