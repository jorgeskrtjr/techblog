import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, LogOut} from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private router:Router, 
    private authService: AuthService
  ){}

  readonly LogOut = LogOut; 

  logout():void{ 
    this.authService.logout(); 
    this.router.navigate(['/login'])
  }
  goToHome():void{ 
    this.router.navigate(['/feed'])
  }
}
