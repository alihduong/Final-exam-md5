import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Book} from "../book";
import {BookService} from "../book.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {BookDetailComponent} from "../book-detail/book-detail.component";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnChanges {
  displayedColumns: any[] = ['STT', 'title', 'author', '#'];
  dataSource!: MatTableDataSource<any>;
  bookList!: Book[];

  constructor(private bookService: BookService,
              private dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.getAllBook();
  }

  getAllBook() {
    this.bookService.getAllBooks().subscribe(data => {
        this.bookList = data
        this.dataSource = new MatTableDataSource(data);
      }
    )
  }

  onEdit(row: any) {
    this.dialog.open(DialogComponent, {
      width: '35%',
      data: row,
      autoFocus: true
    }).afterClosed().subscribe(val => {
      if (typeof val != "string")
       alert("Update success")
        this.getAllBook()
    })
  }

  onDelete(row: any) {
    this.dialog.open(BookDetailComponent, {
      width: '35%',
      data: row,
    }).afterClosed().subscribe(val => {
      if (typeof val != "string")
        alert("Delete success")
        this.getAllBook()
    })
  }

  onView(row: any) {
    this.dialog.open(BookDetailComponent, {
      width: '35%',
      data: {...row, type: "view"},
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllBook()
  }

  onCreate() {
    this.dialog.open(DialogComponent, {
      width: '35%',
      autoFocus: true
    }).afterClosed().subscribe(val => {
      if (typeof val != "string")
        alert("Create success")
      this.getAllBook()
    })
  }
}
