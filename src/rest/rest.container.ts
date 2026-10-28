import {Container} from 'inversify';
import {RestApplication} from './rest.application';
import {Component} from '../shared/types/component.enum';
import {MongoDatabaseClient} from '../shared/libs/database-client/mongo.database-client.js';
import {Logger} from '../shared/libs/logger/logger.interface';
import {PinoLogger} from '../shared/libs/logger/pino.logger';
import {RestConfig} from '../shared/libs/config/rest.config';
import {RestSchema} from '../shared/libs/config/rest.schema';
import {Config} from '../shared/libs/config/config.interface';
import {DatabaseClient} from '../shared/libs/database-client/database-client.interface';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  return restApplicationContainer;
}
