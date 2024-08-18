import { Component, OnInit } from '@angular/core';
import { CurrencyConverterService } from '../../services/currency-converter/currency-converter.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  eurToUahRate: number = 0;
  usdToUahRate: number = 0;

  constructor(private currencyService: CurrencyConverterService) {}

  ngOnInit(): void {
    this.fetchSpecificRates(); // Fetch specific rates for USD to EUR and UAH
  }

  fetchSpecificRates(): void {
    this.currencyService.getExchangeRates('USD').subscribe((data) => {
      this.usdToUahRate = data.rates['UAH'];
    });

    this.currencyService.getExchangeRates('EUR').subscribe((data) => {
      this.eurToUahRate = data.rates['UAH'];
    });
  }
}
