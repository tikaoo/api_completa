import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  productName: any ='' 
  sub$: Subject<string> = new Subject <string>()
  subscription!: Subscription /* desinscrever*/
    
  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
  this.subscription = this.sub$.pipe(debounceTime(2000)).subscribe((p)=> {
       this.router.navigateByUrl(`/home/${p}`) 
   })
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe() /*apaga os vestigios do observable*/
  }

  debounceTest(): void {
   this.sub$.next(this.productName)
};
  findProduct(): void{
    this.router.navigateByUrl(`/product/${this.productName}`)
}
}
