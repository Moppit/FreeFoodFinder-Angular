import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {
  CreateFoodEventReq,
  FilterReq,
  GetEventsRes,
  GetLocationsRes
} from "../models/databse-service.models";

@Injectable({
  providedIn: 'root'
})
export abstract class DatabaseService {
  public abstract getLocations(): Observable<GetLocationsRes>;
  public abstract getAllEvents(): Observable<GetEventsRes>;
  public abstract createEvent(req: CreateFoodEventReq): Observable<any>;
  public abstract getFilteredEvents(params: FilterReq): Observable<GetEventsRes>;
  public abstract increaseReport(id:number): Observable<any>;
}
