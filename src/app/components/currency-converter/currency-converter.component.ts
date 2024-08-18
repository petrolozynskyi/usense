import { Component, OnInit } from '@angular/core';
import { CurrencyConverterService } from '../../services/currency-converter/currency-converter.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CurrencyConverterComponent implements OnInit {
  currency1: string = 'USD';
  currency2: string = 'UAH';
  amount1: number = 1;
  amount2: number = 1;
  currencies: string[] = ['USD', 'UAH', 'EUR'];

  exchangeRates: any = {};
  eurToUahRate: number = 0;
  usdToUahRate: number = 0;
  lastFocusedInput: string = 'amount1';

  constructor(private currencyService: CurrencyConverterService) {}

  ngOnInit(): void {
    this.updateExchangeRate(); // Fetch initial exchange rate on load
  }

  onFocus(inputField: string): void {
    this.lastFocusedInput = inputField;
  }

  updateExchangeRate(): void {
    this.currencyService.getExchangeRates(this.currency1).subscribe((data) => {
      this.exchangeRates[this.currency1] = data.rates;
      if (this.lastFocusedInput === 'amount1') {
        this.calculateConversion1();
      } else {
        this.calculateConversion2();
      }
    });

    this.currencyService.getExchangeRates(this.currency2).subscribe((data) => {
      this.exchangeRates[this.currency2] = data.rates;
      if (this.lastFocusedInput === 'amount1') {
        this.calculateConversion1();
      } else {
        this.calculateConversion2();
      }
    });
  }

  calculateConversion1(): void {
    if (this.exchangeRates[this.currency1]) {
      const rate1To2 = this.exchangeRates[this.currency1][this.currency2];
      if (rate1To2) {
        this.amount2 = parseFloat((this.amount1 * rate1To2).toFixed(2));
      }
    }
  }

  calculateConversion2(): void {
    if (this.exchangeRates[this.currency2]) {
      const rate2To1 = this.exchangeRates[this.currency2][this.currency1];
      if (rate2To1) {
        this.amount1 = parseFloat((this.amount2 * rate2To1).toFixed(2));
      }
    }
  }

  getCurrencySymbol(currency: string): string {
    switch (currency) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'UAH':
        return '₴';
      default:
        return '';
    }
  }
}
