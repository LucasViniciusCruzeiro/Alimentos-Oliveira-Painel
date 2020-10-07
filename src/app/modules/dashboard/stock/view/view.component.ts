import { Component, NgModule, OnInit } from '@angular/core';
import { ProductService } from 'app/shared/services/product.service';
import { ProductionService } from 'app/shared/services/production.service';
import { SwalService } from 'app/shared/services/swal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  view = []; // TAMANHO GRÁFICOS
  viewCard: any[] = [];

  subscription: Subscription;

  // options
  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  singleCard = [];

  colorSchemeCard = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  cardColor = '#232837';

  constructor(
    private _productService: ProductService,
    private _productionService: ProductionService,
    private _swalService: SwalService,
  ) {}

  ngOnInit(): void {
    this.view = [window.innerWidth / 2, window.innerWidth / 5];
    this.viewCard = [window.innerWidth / 1.3, window.innerWidth / 7];
    this.getProducts();
    this.onResize();
    this.onResizeCard();
  }

  onResize = () => window.addEventListener('resize', () => this.view = [window.innerWidth / 2, window.innerWidth / 5]);
  onResizeCard = () => window.addEventListener('resize', () => this.viewCard = [window.innerWidth / 1.3, window.innerWidth / 7]);

  getProducts(): void {
    this.subscription = this._productService.loadAll().subscribe((result: any) => {
      this.singleCard = [];
      result.data.map(res => {
        const obj = {
          name: res.name,
          value: res.amount
        };
        this.singleCard.push(obj);
      });
    }, (error) => {

      this._swalService.error('Ops', error.error.message);
    });
  }

}
