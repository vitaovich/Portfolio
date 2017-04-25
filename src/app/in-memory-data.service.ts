import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Project, ImageFile, Content } from './projects/project';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let projects = [
      new Project(1, 'Portfolio', new ImageFile('portfolioImage', 'QWIOE2JLQ9902903.jpg'),
        [new Content('text', 'This project is cool'), new Content('image', 'H23O90XU1JNQOIJW.jpg')])
    ];
    return {projects};
  }
}
