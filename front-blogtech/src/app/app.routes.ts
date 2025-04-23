import { Routes } from '@angular/router';
import { FeedComponent } from './features/feed/feed.component';
import { ArticleComponent } from './features/article/article.component';
import { CreateArticleComponent } from './features/create-article/create-article.component';
import { PublicLayoutComponent } from './features/public-layout/public-layout.component';
import { ClientLayoutComponent } from './features/client-layout/client-layout.component';
import { LoginComponent } from './features/login/login.component';
import { EditArticleComponent } from './features/edit-article/edit-article.component';
import { HomeComponent } from './features/home/home.component';
import { AuthGuard } from './core/security/auth.guard';

export const routes: Routes = [
    {    
        path: '',
        component: PublicLayoutComponent, 
        children: [
            {path: 'login', component: LoginComponent},
            {path: '', component: HomeComponent}
        ]
    },
    {   
        path: '', 
        component: ClientLayoutComponent, 
        canActivate: [AuthGuard], 
        children: [
            {path: 'feed', component:FeedComponent}, 
            {path: 'article/:id', component:ArticleComponent},
            {path: 'create', component: CreateArticleComponent}, 
            {path: 'edit', component: EditArticleComponent},
          
        ]
    }, 

    { path: '**', redirectTo: '', pathMatch: 'full' }

];
