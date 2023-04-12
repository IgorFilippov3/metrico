import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { UserModel } from "@app/_core/models/user.model";
import { MtHttpClientService } from "@app/_core/services/mt-http-client.service";
import { map, take } from "rxjs/operators";
import { UserRole } from "@app/_core/models/user-role.enum";

@Injectable()
export class UserService {
  private userSource: ReplaySubject<UserModel | null> = new ReplaySubject<UserModel | null>(1);
  user$: Observable<UserModel | null> = this.userSource.asObservable();

  isAuthenticated$: Observable<boolean> = this.user$
    .pipe(map((user: UserModel | null) => !!user))
  isAdmin$: Observable<boolean> = this.user$
    .pipe(map((user: UserModel | null) => user?.role === UserRole.ADMIN))

  constructor(private httpClient: MtHttpClientService) {
    this.loadCurrentUserFromApi()
      .subscribe({
        next: (user: UserModel) => this.userSource.next(user),
        error: () => this.userSource.next(null),
      });
  }

  getCurrentUser(): Observable<UserModel | null> {
    return this.user$.pipe(take(1));
  }

  getCurrentUserFromApi(): Observable<UserModel | null> {
    return this.loadCurrentUserFromApi();
  }

  updateUserServiceState(): Observable<void> {
    return new Observable(observer => {
      this.loadCurrentUserFromApi()
        .subscribe({
          next: (user: UserModel) => {
            this.userSource.next(user);
            observer.next();
          },
          error: () => {
            this.userSource.next(null);
            observer.next();
          },
        });
    });
  }

  private loadCurrentUserFromApi(): Observable<UserModel> {
    return this.httpClient.get<UserModel>("/users/me")
  }
}