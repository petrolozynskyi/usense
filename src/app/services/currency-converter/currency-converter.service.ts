import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterService {
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest/'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Method to get exchange rates for a base currency
  getExchangeRates(baseCurrency: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${baseCurrency}`);
  }

  // Method to calculate the conversion
  convertCurrency(
    baseRate: number,
    targetRate: number,
    amount: number
  ): number {
    return (amount * targetRate) / baseRate;
  }
}
