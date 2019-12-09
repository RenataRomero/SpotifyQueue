import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService:AuthService) {

  }
  ngOnInit() {
    this.authService.getTokens().subscribe(tokens =>{
      if(tokens.access_token && tokens.access_token!=""){
        localStorage.setItem('token',tokens.access_token);
        localStorage.setItem('refresh_token',tokens.refresh_token);
      }
    })
  }
}
