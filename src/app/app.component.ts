import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component'; // Standalone
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CurrencyConverterComponent, HeaderComponent], // Use the standalone component here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'currency';
}
