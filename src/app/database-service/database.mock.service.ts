import {DatabaseService} from "./database.service";
import {Observable, of} from "rxjs";
import {GetAllEventsRes} from "../models/databse-service.models";
import {getAllEventsResponses} from "../models/mock-data";

export class DatabaseMockService implements DatabaseService {
  public getAllEvents(): Observable<GetAllEventsRes> {
    return of(getAllEventsResponses[0]);
  }
}
