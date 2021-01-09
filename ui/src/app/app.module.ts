import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StarAspectsPage } from './pages/star-aspects/star-aspects.page';
import { HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';

import { CSRFTokenService } from './services/csrftoken.service';

@NgModule({
  declarations: [
    AppComponent,
    StarAspectsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken',
    }),
  ],
  providers: [
    CSRFTokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
