import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppRoutingModule } from '../app-routing.module';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { NotesService } from '../notes/notes.service';
import { LocalInfoService } from '../shared/local-info.service';
import { ViewService } from '../shared/view.service';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HeaderComponent, HomeComponent, AboutComponent, FooterComponent],
  imports: [CommonModule, FormsModule, AppRoutingModule, AuthModule],
  exports: [AppRoutingModule, HeaderComponent, FooterComponent],
  providers: [NotesService, LocalInfoService, AuthService, AngularFireAuth, ViewService]
})
export class CoreModule {}
