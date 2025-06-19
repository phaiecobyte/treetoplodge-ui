import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { HomeDataSource, HomeItem } from './home-datasource';
import { Footer } from "../footer/footer";
import { Header } from "../header/header";
import { RouterModule } from '@angular/router';
import { CarouselComponent, CarouselItem } from '../../shared/components/carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, Footer, Header,RouterModule,CarouselComponent]
})
export class Home implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<HomeItem>;
  dataSource = new HomeDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  carouselItems: CarouselItem[] = [
    {
      id: 1,
      imageSrc: './banner1.jpg',
      imageAlt: 'Resort Main View',
      title: 'Experience Luxury in the Trees',
      description: 'Immerse yourself in nature without sacrificing comfort',
      buttonText: 'Book Now',
      buttonLink: '/booking'
    },
    {
      id: 2,
      imageSrc: './banner2.jpg',
      imageAlt: 'Treehouse Suite',
      title: 'Exclusive Treehouse Suites',
      description: 'Wake up to birds singing and breathtaking forest views',
      buttonText: 'View Rooms',
      buttonLink: '/rooms'
    },
    {
      id: 3,
      imageSrc: './banner3.jpg',
      imageAlt: 'Resort Restaurant',
      title: 'Fine Dining Among the Canopy',
      description: 'Enjoy gourmet meals with panoramic forest views',
      buttonText: 'See Menu',
      buttonLink: '/dining'
    }
  ];
}
