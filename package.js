
Package.describe({ summary: 'Satellite framework for Meteor.' });

Package.on_use( function (api) {
    api.use('underscore');
    api.add_files( 'sat.js', ['client', 'server'] );
    api.export( 'Sat',    ['client', 'server'] );
    api.export( '__',     ['client', 'server'] );    
    api.export( 'Page',   ['client', 'server'] );
    api.export( 'Config', ['client', 'server'] );
    api.export( 'module', ['client', 'server'] );
});