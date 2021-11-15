import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {GetAllEventsRes} from "../models/databse-service.models";

@Injectable({
  providedIn: 'root'
})
export abstract class DatabaseService {
  public abstract getAllEvents(): Observable<GetAllEventsRes>
}
