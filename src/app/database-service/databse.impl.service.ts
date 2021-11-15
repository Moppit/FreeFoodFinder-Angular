import {DatabaseService} from "./database.service";
import {GetAllEventsRes} from "../models/databse-service.models";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

export class DatabseImplService implements DatabaseService {

  constructor(private http: HttpClient) {
  }

  public getAllEvents(): Observable<GetAllEventsRes> {
    return this.http.get<GetAllEventsRes>(`${environment.backendHost}/fff`);
  }
}
