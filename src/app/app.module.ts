import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { TableComponent } from './components/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';
import { NgxBootstrapIconsModule, alarm, alarmFill, alignBottom, sortDown } from 'ngx-bootstrap-icons';

const icons = {
  alarm,
  alarmFill,
  alignBottom,
  sortDown
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundPageComponent,
    TableComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxBootstrapIconsModule.pick(icons)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
