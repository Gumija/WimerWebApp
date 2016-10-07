"use strict";
var router_1 = require('@angular/router');
var document_list_component_1 = require('./document-list/document-list.component');
var document_reader_component_1 = require('./document-reader/document-reader.component');
var appRoutes = [
    {
        path: '',
        redirectTo: '/documents',
        pathMatch: 'full'
    },
    {
        path: 'documents',
        component: document_list_component_1.DocumentListComponent,
    },
    {
        path: 'document/:id',
        component: document_reader_component_1.DocumentReaderComponent
    },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map