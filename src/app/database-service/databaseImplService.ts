import {DatabaseService} from "./database.service";
import {CreateFoodEventReq, GetAllEventsRes, GetLocationsRes} from "../models/databse-service.models";
import {map, Observable, of, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

export class DatabaseImplService implements DatabaseService {

  constructor(private http: HttpClient) {
  }

  public getLocations(): Observable<GetLocationsRes> {
    return this.http.get<GetLocationsRes>(`${environment.backendHost}/fff/locations`).pipe(
      // Get locations into alphabetical order
      switchMap((locationsRes) => of({
        locations: locationsRes.locations.sort(function (a, b) {
          let keyA = a.locationName;
          let keyB = b.locationName;
          if (keyA < keyB) return -1;
          if (keyB < keyA) return 1;
          return 0;
        })
      }))
    );
  }

  public getAllEvents(): Observable<GetAllEventsRes> {
    return this.http.get<GetAllEventsRes>(`${environment.backendHost}/fff/events`);
  }

  public createEvent(req: CreateFoodEventReq): Observable<any> {
    return this.http.post<any>(`${environment.backendHost}/fff/events`, JSON.stringify(req));
  }
}
