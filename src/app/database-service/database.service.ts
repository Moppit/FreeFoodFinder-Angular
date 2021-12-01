import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {
  CreateFoodEventReq,
  FilterReq,
  GetEventsRes,
  GetLocationsRes
} from "../models/databse-service.models";

/**
 *
 *  SINGLETON
 *
 *  This service is a singleton, with one instance of it being
 *  created at runtime and injected into its clients. The
 *  singleton is created and provided by Angular.
 *
 */

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
