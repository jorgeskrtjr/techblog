import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './app/core/security/token.inteceptor';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([TokenInterceptor]) 
    ),
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));
