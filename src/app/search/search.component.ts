import { Component, OnInit } from '@angular/core';
import { GithubApiService } from '../github-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  find: string;
  foundedUsers;
  totalUsers;

  currentPage = 1;
  numOfPages;
  perPage = 20;
  pagesToShow;



  constructor(private GithubApiService: GithubApiService,
              private route: ActivatedRoute) { }

  ngOnInit( ) {
    if (this.route.snapshot.paramMap.get('user') || this.find == null )  {
      this.find = this.route.snapshot.paramMap.get('user');
      this.setPage(this.currentPage);
    }
  }

  findUsers() {
    this.GithubApiService.getUsers(this.find).subscribe( founded => {
      this.foundedUsers = founded.items;
      this.totalUsers = founded.total_count;
      console.log(this.totalUsers);
    });
  }

  setPage(page: number) {
    this.GithubApiService.getPage(page, this.find).subscribe( founded => {
      this.foundedUsers = founded.items;
      this.totalUsers = founded.total_count;

      this.currentPage = page;

      this.numOfPages = Math.ceil(this.totalUsers / this.perPage);

      const totalPages = [];
      for (let i = 1; i <= this.numOfPages; i++) {
        totalPages.push(i);
      }

      if (this.currentPage < 1) {
        this.currentPage = 1;
      } else if (this.currentPage > this.numOfPages) {
        this.currentPage = this.numOfPages;
      }

      let startPage: number;
      let endPage: number;
      if (this.numOfPages <= 9) {
        startPage = 1;
        endPage = this.numOfPages;
      } else {
        if (this.currentPage <= 5) {
          startPage = 1;
          endPage = 9;
        } else if (this.currentPage + 4 >= this.numOfPages) {
          startPage = this.numOfPages - 8;
          endPage = this.numOfPages;
        } else {
          startPage = this.currentPage - 4;
          endPage = this.currentPage + 4;
        }
      }

      const startIndex: number = (startPage - 1);
      const endIndex: number = endPage;

      this.pagesToShow = totalPages.slice(startIndex, endIndex);
      console.log(this.pagesToShow);
    });
}
}
