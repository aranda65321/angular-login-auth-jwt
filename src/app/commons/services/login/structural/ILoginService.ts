import { Observable } from "rxjs";

export interface ILoginService {

  authenticateUser(username: string, password: string): any;
  createUser(username: string, password: string): Observable<any>;
  logout(): any;

}
