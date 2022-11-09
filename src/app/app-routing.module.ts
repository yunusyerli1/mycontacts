import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailResolver } from './helper/resolvers/userDetail.resolver';
import { FeaturePageComponent } from './pages/feature-page/feature-page.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "detail/:id", resolve:{user:UserDetailResolver}, component: UserDetailComponent },
  { path: "feature", component: FeaturePageComponent },
  { path: "404", component: NotFoundPageComponent },
  { path: "**", component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
