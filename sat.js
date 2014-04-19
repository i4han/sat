__ = {}
Page = {};
Config = {};
module = { exports: {} }

__.deepExtend = function (target, source) {
    for (var prop in source)
        if (prop in target)
            __.deepExtend(target[prop], source[prop]);
        else
            target[prop] = source[prop];
    return target;
}

Sat = {
    isServer: false,
    isClient: false
}

Sat.init = function () {
    _.extend( __, module.exports.__ );
    __.deepExtend( Config, module.exports.__config__ );
    _.extend( Page, module.exports );
    if ( Meteor.isServer ) {
        Sat.isServer = true;
        __.deepExtend( Config, module.exports.__server_config__ );
    } else if ( Meteor.isClient ) {
        Sat.isClient = true;
        Router.configure({ layoutTemplate: 'layout' });
        _.each(_.keys(Page), function(file) {
            if (file.substring(0, 2) !== '__')
                _.each(_.keys(Page[file]), function(page) {
                    if (page.substring(0, 2) !== '__')
                        _.each(_.keys(Page[file][page]), function(key) {
                            if (key.substring(0, 2) !== '__' && _.indexOf(Config.templates, key) == -1 )
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
        var startup = [];
        _.each(_.keys(Page), function(file) {
            if (Page[file].__events__ && Page[file].__events__.startup)
                startup.push(Page[file].__events__.startup);
        });        
        Meteor.startup(function() {
            _.each(startup, function(func) { func() });
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