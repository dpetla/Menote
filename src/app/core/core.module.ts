import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

import { AppRoutingModule } from '../app-routing.module';
import { AuthModule } from '../auth/auth.module';
import { MaterialModule } from '../material/material.module';

import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ContactFormComponent } from './home/contact-form/contact-form.component';
import { FeaturesComponent } from './home/features/features.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './home/landing/landing.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    LandingComponent,
    FeaturesComponent,
    ContactFormComponent,
  ],
  imports: [CommonModule, FormsModule, AppRoutingModule, AuthModule, MaterialModule],
  exports: [AppRoutingModule, HeaderComponent, FooterComponent],
  providers: [AngularFireAuth],
})
export class CoreModule {}
