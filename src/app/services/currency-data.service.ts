import { Injectable } from '@angular/core';
import { Currency } from '../enums/Currency';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { firstValueFrom, map } from 'rxjs';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root',
})
export class CurrencyDataService {
  constructor(private httpClient: HttpClient) {}

  loadDataOfCurrency(
    currency: Currency
  ): Promise<{ items: Item[]; date: Date }> {
    const url = `${environment.apiUrl}?base=${currency}&api_key=${environment.apiKey}`;

    return firstValueFrom(
      this.httpClient.get<any>(url).pipe(
        map((response: any) => {
          const items = Object.entries(response.rates).map(
            ([key, value]: any) => ({
              currency: key,
              value: value,
            })
          );
          const date = new Date(response.date);
          return { items, date };
        })
      )
    );
  }
}
