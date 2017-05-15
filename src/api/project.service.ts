import Project = require('./models/project');
import { Request, Response } from 'express';
import { Error } from 'mongoose';


export class ProjectService {

  get2 ( req: Request, res: Response ): void {
    console.log('Get project: ' + req.params.idea );
    Project.findOne({ _id: req.params.id })
    .exec(function ( err, project ) {
        if ( err ) { return this.handleError( err, res ); }
        console.log(project);
        res.send( project );
    });
  }

  getAll ( req: Request, res: Response ): void {
    console.log('Get all projects.');
    Project.find({})
    .limit(100) // TODO: find better alternative other than hard coding limit
    .exec( function(err, projects) {
      if ( err ) {return this.handleError( err, res ); }
      res.send( projects );
    });
  }

  post ( req: Request, res: Response ): void {
    console.log('Post a project.');
    console.log(req.body);
    let project = new Project(req.body);
    project.save( err => {
      if ( err ) {return this.handleError( err, res ); }
    });
    res.send(project);
  }

  put ( req: Request, res: Response ): void {
    let id = req.params.id;
    console.log( 'Put project: ' + req.params.id );
    Project.findByIdAndUpdate(id, req.body, { new: true }, (err, project) => {
          if ( err ) {return this.handleError( err, res ); }
          res.send(project);
    });
  }

  delete ( req: Request, res: Response ): void {
    console.log( 'Delete project: ' + req.params.id );
    Project.findByIdAndRemove( req.params.id, function (err, project) {
      if ( err ) {return this.handleError( err, res ); }
      res.send(project);
    });
  }

  private handleError ( err: Error, res: Response ): void {
      res.send(404);
      console.log('\n\nFound error\n\n');
      console.log(err);
    }
  }
