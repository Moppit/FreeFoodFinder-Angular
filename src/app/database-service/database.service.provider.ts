import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DatabseImplService} from "./databse.impl.service";
import {DatabaseMockService} from "./database.mock.service";
import {DatabaseService} from "./database.service";

const databaseServiceFactory = (http: HttpClient) => {
  if (environment.useRealDatabaseService) {
    return new DatabseImplService(http);
  } else {
    return new DatabaseMockService();
  }
};

export const databaseServiceProvider = {
  provide: DatabaseService,
  useFactory: databaseServiceFactory,
  deps: [HttpClient],
};
