import {DatabaseService} from "./database.service";
import {Observable, of} from "rxjs";
import {CreateFoodEventReq, FilterReq, GetEventsRes, GetLocationsRes} from "../models/databse-service.models";
import { getAllEventsResponses, getLocationsResponses} from "../models/mock-data";

export class DatabaseMockService implements DatabaseService {
  public getLocations(): Observable<GetLocationsRes> {
    return of(getLocationsResponses[0]);
  }

  public getAllEvents(): Observable<GetEventsRes> {
    return of(getAllEventsResponses[0]);
  }

  public createEvent(req: CreateFoodEventReq): Observable<any> {
    return of({});
  }

  public getFilteredEvents(params: FilterReq): Observable<GetEventsRes> {
    return of(getAllEventsResponses[0]);
  }
}
