__ = {}, db = {}, Page = {}, Config = {};
module = { exports: {} };
Sat = { isServer: false, isClient: false, isConfig: false };

__.deepExtend = function (target, source) {
    for (var prop in source)
        if (prop in target)
            __.deepExtend(target[prop], source[prop]);
        else
            target[prop] = source[prop];
    return target;
}


__.capitalize = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


db.init = function () {
    db.collections = Config.collections;
    _.each( db.collections, function (collection) {
        var Collection = __.capitalize(collection)
        if ( 'undefined' === typeof db[ Collection ] )
            db[ Collection ] = new Meteor.Collection(collection);
    });
}

if ( Meteor.isClient ) {
    $( function () {
        if ( ! Sat.isClient ) Sat.init(); 
        console.log('sat init.'); 
    });
}

Sat.config = function () {
    Sat.isConfig = true;
    __.deepExtend( Config, module.exports.Config );
    delete module.exports.Config;
}


Sat.init = function () {
    if ( ! Sat.isConfig ) Sat.config();
    _.extend( __, module.exports.__ );
    delete module.exports.__;
    db.init();
    _.extend( Page, module.exports );
    if ( Meteor.isServer ) {
        Sat.isServer = true;
        __.deepExtend( Config, module.exports.ServerConfig );
        delete module.exports.ServerConfig;
    } else if ( Meteor.isClient ) {
        Sat.isClient = true;
        Router.configure({ layoutTemplate: 'layout' });
        
        var startup = [];
        _.each(_.keys(Page), function(file) {
            if (Page[file].__events__ && Page[file].__events__.startup)
                startup.push(Page[file].__events__.startup);
        });        
        Meteor.startup(function() {
            _.each(startup, function(func) { func() });
        });        
        _.each(_.keys(Page), function(file) {
            if (file.substring(0, 2) !== '__' || file.substring(0, 1) <= 'Z')
                _.each(_.keys(Page[file]), function(page) {
                    if (page.substring(0, 2) !== '__')
                        _.each(_.keys(Page[file][page]), function(key) {
                            if (key.substring(0, 2) !== '__' && _.indexOf(Config.templates, key) === -1 )
                                if (key === 'helpers')
                                    Template[page].helpers( Page[file][page].helpers );
                                else if (key === 'events')
                                    Template[page].events( Page[file][page].events );
                                else
                                    Template[page][key] = Page[file][page][key];
                        });
                    else
                        delete Page[file][page]
                        });
            else
                delete Page[file]
                });
        var router_map = { home:{ path:'/' }, x3d:{}, help:{}, profile:{} };
        Router.map( function () {
            for (var key in router_map)
                this.route( key, router_map[key] );
        });
    } 
    delete module.exports
}


vaild_keys = [
    'dropdownVisible', 'inSignupFlow', 'inForgotPasswordFlow', 'inChangePasswordFlow', 'inMessageOnlyFlow',
    'errorMessage', 'infoMessage', 'resetPasswordToken', 'enrollAccountToken', 'justVerifiedEmail',
    'configureLoginServiceDialogVisible', 'configureLoginServiceDialogServiceName', 'configureLoginServiceDialogSaveDisabled' ];

validateKey = function ( key ) { 
/*    if (!_.contains( vaild_keys, key ) )
        throw new Error( "Invalid key in loginButtonsSession: " + key ); */
}