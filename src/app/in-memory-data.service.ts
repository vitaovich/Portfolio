import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Project } from './projects/project';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let projects = [
      new Project(1, 'Portfolio')
    ];
    return {projects};
  }
}
