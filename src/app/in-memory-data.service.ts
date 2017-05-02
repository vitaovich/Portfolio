import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Project, Content } from './projects/project';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let projects = [
      new Project( 'Portfolio', new Content('img', 'angular_logo.png') )
    ];
    return {projects};
  }
}
