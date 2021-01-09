import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StarAspectsPage } from './pages/star-aspects/star-aspects.page';

@NgModule({
  declarations: [
    AppComponent,
    StarAspectsPage
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
