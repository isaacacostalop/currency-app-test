import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Currency } from 'src/app/enums/Currency';
import { Item } from 'src/app/models/Item';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-currency-table',
  templateUrl: './currency-table.component.html',
  styleUrls: ['./currency-table.component.scss'],
})
export class CurrencyTableComponent implements OnChanges {
  @Input() currency: Currency = Currency.USD;
  @Input() pageSize: number = PAGE_SIZE;
  @Input() date!: Date;
  @Input() items: Item[] = [];
  @Output() onRefresh = new EventEmitter<any>();

  currentPage: number = 1;
  filteredItems: Item[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('items') && changes['items'].currentValue) {
      this.initTable();
    }
  }

  handleRefresh() {
    this.onRefresh.emit();
  }

  handleNextPage() {
    this.currentPage += 1;
    this.paginate();
  }

  handlePreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.paginate();
    }
  }

  private initTable() {
    this.currentPage = 1;
    this.paginate();
  }

  private paginate() {
    const from = (this.currentPage - 1) * this.pageSize;
    const to = this.currentPage * this.pageSize;

    this.filteredItems = this.items.slice(from, to);
  }
}
