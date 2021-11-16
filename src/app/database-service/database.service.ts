import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {GetAllEventsRes, GetLocationsRes} from "../models/databse-service.models";

@Injectable({
  providedIn: 'root'
})
export abstract class DatabaseService {
  public abstract getLocations(): Observable<GetLocationsRes>;
  public abstract getAllEvents(): Observable<GetAllEventsRes>;
}
