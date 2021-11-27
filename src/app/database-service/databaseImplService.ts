import {DatabaseService} from "./database.service";
import {CreateFoodEventReq, FilterReq, GetEventsRes, GetLocationsRes} from "../models/databse-service.models";
import {map, Observable, of, switchMap} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
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

  public getAllEvents(): Observable<GetEventsRes> {
    return this.http.get<GetEventsRes>(`${environment.backendHost}/fff/events`);
  }

  public createEvent(req: CreateFoodEventReq): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<any>(`${environment.backendHost}/fff/events`, JSON.stringify(req), {headers: headers});
  }

  public getFilteredEvents(params: FilterReq): Observable<GetEventsRes> {
    let urlParams: HttpParams = new HttpParams();
    let headers: HttpHeaders = new HttpHeaders();
    headers= headers.set('Content-Type', 'application/json');

    if (params.searchTerm) {
      urlParams = urlParams.append('search', params.searchTerm);
    }
    if (params.locationID) {
      urlParams = urlParams.append('location', params.locationID.toString());
    }
    if (params.filters) {
      urlParams = urlParams.append('filters', params.filters.toString());
    }
    return this.http.get<GetEventsRes>(`${environment.backendHost}/fff/events`, {
        responseType: 'json',
        headers: headers,
        observe: "body",
        params: urlParams
      }
    );
  }
}
