import { Component, OnInit } from '@angular/core';
import { Currency } from 'src/app/enums/Currency';
import { Item } from 'src/app/models/Item';
import { CurrencyDataService } from 'src/app/services/currency-data.service';

const REFRESH_TIME_MS = 10000;
const PAGE_SIZE = 5;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currency = Currency;

  intervalUsd: any;
  intervalEur: any;

  usdItems: Item[] = [];
  eurItems: Item[] = [];
  usdDate: Date = new Date();
  eurDate: Date = new Date();

  defaultPageSize = PAGE_SIZE;

  error: string | null = null;

  constructor(private currencyDataService: CurrencyDataService) {}

  async ngOnInit(): Promise<void> {
    this.refreshUsdItems();
    this.refreshEurItems();
  }

  refreshUsdItems() {
    console.log('Refreshing USD data...');
    this.fetchUsdData();

    if (this.intervalUsd) {
      clearInterval(this.intervalUsd);
    }

    this.intervalUsd = setInterval(() => {
      console.log('Refreshing USD data with interval...');
      this.fetchUsdData();
    }, REFRESH_TIME_MS);
  }

  refreshEurItems() {
    console.log('Refreshing EUR data...');
    this.fetchEurData();

    if (this.intervalEur) {
      clearInterval(this.intervalEur);
    }

    this.intervalEur = setInterval(() => {
      console.log('Refreshing EUR data with interval...');
      this.fetchEurData();
    }, REFRESH_TIME_MS);
  }

  private async fetchUsdData() {
    this.usdItems = [];
    const response = await this.fetchData(Currency.USD);
    this.usdItems = response.items;
    this.usdDate = response.date;
  }

  private async fetchEurData() {
    this.eurItems = [];
    const response = await this.fetchData(Currency.EUR);
    this.eurItems = response.items;
    this.eurDate = response.date;
  }

  private async fetchData(
    currency: Currency
  ): Promise<{ items: Item[]; date: Date }> {
    try {
      return await this.currencyDataService.loadDataOfCurrency(currency);
    } catch (error) {
      console.error(error);
      this.error = 'Error loading data. Please try again later.';
      return { items: [], date: new Date() };
    }
  }
}
