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
import { NgxBootstrapIconsModule, sortDown, funnel, xLg } from 'ngx-bootstrap-icons';
import { SortDirective } from './helper/directives/sort.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LoadingService } from './services/loading.service';
import { ErrorMessagesComponent } from './components/error-messages/error-messages.component';
import { ErrorMessageService } from './services/error-message.service';
import { ModalAddComponent } from './components/modal-add/modal-add.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeaturePageComponent } from './pages/feature-page/feature-page.component';
import { UserFacade } from './pages/feature-page/user.facade';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserDetailResolver } from './helper/resolvers/userDetail.resolver';

const icons = {
  sortDown,
  funnel,
  xLg
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundPageComponent,
    TableComponent,
    LoadingComponent,
    SortDirective,
    SearchBarComponent,
    ErrorMessagesComponent,
    ModalAddComponent,
    FeaturePageComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxBootstrapIconsModule.pick(icons),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [LoadingService, ErrorMessageService, UserFacade, UserDetailResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
