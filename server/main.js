import {Meteor} from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';

import '../imports/api/users';
import '../imports/api/covoits';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  // code to run in server at startup
  // WebApp.connectHandlers.use((req, res, next)=> {
  //   console.log('This is from my custom middleware');
  //   console.log(req.url, req.method, req.headers, req.query);
  //   next();
  // });
});
