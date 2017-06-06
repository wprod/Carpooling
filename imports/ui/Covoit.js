import React from 'react';
import {Meteor} from 'meteor/meteor';

import CovoitsList from './CovoitList/CovoitsList';
import PrivateHeader from './PrivateHeader';
import AddCovoit from './CovoitList/AddCovoit';

export default () => {
  return (
      <div>
        <PrivateHeader title="WeFly"/>
        <CovoitsList/>
        <AddCovoit />
      </div>
    );
}