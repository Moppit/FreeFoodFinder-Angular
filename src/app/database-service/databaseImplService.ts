import {DatabaseService} from "./database.service";
import {GetAllEventsRes, GetLocationsRes} from "../models/databse-service.models";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

export class DatabaseImplService implements DatabaseService {

  constructor(private http: HttpClient) {
  }

  public getLocations(): Observable<GetLocationsRes> {
    return this.http.get<GetLocationsRes>(`${environment.backendHost}/fff/locations`);
  }

  public getAllEvents(): Observable<GetAllEventsRes> {
    return this.http.get<GetAllEventsRes>(`${environment.backendHost}/fff/events`);
  }
}
