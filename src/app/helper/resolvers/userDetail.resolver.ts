import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { IUser } from "src/app/models/UserModel";
import { DataService } from "src/app/services/data.service";

@Injectable({ providedIn: 'root' })
export class UserDetailResolver implements Resolve<IUser> {
  constructor(private dataService: DataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IUser>|Promise<IUser>|IUser {
    console.log("asd")
    return this.dataService.loadUser(route.paramMap.get('id'));
  }
}
