import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// feature modules
import { AppRoutingModule } from '../app-routing.module';
import { AuthModule } from '../auth/auth.module';

// components
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';

// services
import { UserService } from '../shared/user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { NotesService } from '../notes/notes.service';
import { DataService } from '../shared/data.service';
import { LocalInfoService } from '../shared/local-info.service';
import { AuthService } from '../auth/auth.service';
import { ViewService } from '../shared/view.service';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    AuthModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    NotesService,
    DataService,
    LocalInfoService,
    AuthService,
    AngularFireAuth,
    UserService,
    ViewService
  ]
})
export class CoreModule {

}
