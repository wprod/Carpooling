import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {Tracker} from 'meteor/tracker';

import Signup from '../ui/Signup';
import Covoit from '../ui/Covoit';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import CovoitSingle from '../ui/CovoitSingle/CovoitSingle';
import CovoitSingleAdmin from '../ui/CovoitSingle/CovoitSingleAdmin';
import UserSingleAdmin from '../ui/UserAdmin/UserSingleAdmin';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/covoits'];

const onEnterPublicPage = () => {
    if (Meteor.userId()) {
        browserHistory.replace('/covoits');
    };
};
const onEnterPrivatePage = () => {
    if (!Meteor.userId()) {
        browserHistory.replace('/');
    }
};
export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.getCurrentLocation().pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (isUnauthenticatedPage && isAuthenticated) {
        browserHistory.replace('/covoits');
    } else if (isAuthenticatedPage && !isAuthenticated) {
        browserHistory.replace('/');
    }
}

export const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
        <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
        <Route path="/covoits" component={Covoit} onEnter={onEnterPrivatePage}/>
        <Route path="/travels/:id" component={CovoitSingle} onEnter={onEnterPrivatePage}/>
        <Route path="/travels/:id/admin" component={CovoitSingleAdmin} onEnter={onEnterPrivatePage}/>
        <Route path="/user/:id/admin" component={UserSingleAdmin} onEnter={onEnterPrivatePage}/>
        <Route path="*" component={NotFound}/>
    </Router>
);