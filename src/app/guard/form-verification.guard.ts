import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NewProductComponent } from '../pages/new-product/new-product.component';

interface OnCanDeactivate{
  canDeactivate():Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
}

@Injectable({
  providedIn: 'root'
})
export class FormVerificationGuard implements CanDeactivate<OnCanDeactivate> {
  canDeactivate(
    component: NewProductComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      /*if(component.productForm.dirty) {
        return confirm('Os dados não foram salvos. Deseja realmente sair?')
      }
      return true;*/
      return component.canDeactivate()
    }

  
}
