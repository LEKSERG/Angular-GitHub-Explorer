import { Component, OnInit } from '@angular/core';
import { GithubApiService } from '../github-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  userInfo;
  userRepos;

  constructor(private GithubApiService: GithubApiService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const userLogin = this.route.snapshot.paramMap.get('userlogin');
    this.GithubApiService.getUser(userLogin).subscribe( user => this.userInfo = user);
    this.GithubApiService.getRepos(userLogin).subscribe( repos => this.userRepos = repos);
  }
}
