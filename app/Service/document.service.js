"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var document_1 = require('../Entity/document');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
// NETWORK EXAMPLE
var DocumentService = (function () {
    function DocumentService(http) {
        this.http = http;
        this.heroesUrl = 'api/Documents'; // URL to web api
    }
    DocumentService.prototype.getDocuments = function () {
        return this.http.get(this.heroesUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    DocumentService.prototype.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response statuss: ' + res.status);
        }
        var body = res.json();
        var list = [];
        for (var i in body) {
            var doc = new document_1.Document();
            doc.id = body[i].Id;
            doc.title = body[i].Path;
            list.push(doc);
        }
        return list;
    };
    DocumentService.prototype.handleError = function (error) {
        // In a real world app, we might send the error to remote logging infrastructure
        var errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    DocumentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DocumentService);
    return DocumentService;
}());
exports.DocumentService = DocumentService;
//# sourceMappingURL=document.service.js.map