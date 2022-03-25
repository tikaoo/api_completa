import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import {HomeComponent} from '../app/pages/home/home.component'
import { ProductComponent } from "./pages/product/product.component";
import {  NewProductComponent  } from './pages/new-product/new-product.component';
import { ProductsComponent } from "./pages/products/products.component";
import { UpdateProductComponent } from "./pages/update-product/update-product.component";
import { FormVerificationGuard } from "./guard/form-verification.guard";
import { AuthGuard} from "./guards/auth.guard"
import { ChildAuthVerificationGuard } from "./guards/child-auth-verification.guard";

const routes: Routes=[
    {
        path:'',
        pathMatch:'full',
        redirectTo:'/home'
    },
        {
            path:'home',
            component:HomeComponent,
            children:[
                {
                    path:':name',
                    component:ProductComponent
                }
            ],
                canActivateChild:[
                    ChildAuthVerificationGuard
                ]
        }, 

        {
            path:'new',
            component:NewProductComponent,
            canDeactivate: [
                FormVerificationGuard
            ],

            canActivate: [
                AuthGuard
            ]

    
        },    
        {
            path:'update',
            component:UpdateProductComponent,
            canDeactivate: [
                FormVerificationGuard
            ],
            
        },
       
        {
            path:'products',
            component:ProductsComponent

        }, 
        {
            path:'product/:name',
            component:ProductComponent

        },
       
                        
    {
        path:'**',
        redirectTo:'/home'
    }

]

@NgModule({
    declarations: [

    ],
    imports:[
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    providers:[],

    exports:[
        RouterModule
    ]
    })
export class AppRoutingModule{}