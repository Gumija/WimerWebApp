/// <reference path="../../typings/TextHighlighter.d.ts" />
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
var document_service_1 = require('./document.service');
var comment_service_1 = require('./comment.service');
var highlight_service_1 = require('./highlight.service');
var comment_1 = require('./comment');
var router_1 = require('@angular/router');
var DocumentReaderComponent = (function () {
    function DocumentReaderComponent(documentService, commentService, highlightService, route, location, renderer) {
        this.documentService = documentService;
        this.commentService = commentService;
        this.highlightService = highlightService;
        this.route = route;
        this.location = location;
        this.renderer = renderer;
    }
    DocumentReaderComponent.prototype.editComment = function (comment) {
        this.tempComment.id = comment.id;
        this.tempComment.title = comment.title;
        this.tempComment.content = comment.content;
        this.tempComment.top = comment.top;
        this.showCommentEditor = true;
    };
    DocumentReaderComponent.prototype.addComment = function () {
        if (window.getSelection()) {
            if (window.getSelection().getRangeAt(0)) {
                this.resetTempComment();
                var top_1 = window.getSelection().getRangeAt(0).getBoundingClientRect().top
                    - this.commentColumn.nativeElement.getBoundingClientRect().top;
                this.tempComment.top = top_1;
                this.showCommentEditor = true;
            }
        }
        this.updateComments();
    };
    DocumentReaderComponent.prototype.saveComment = function () {
        if (this.tempComment.id == -1) {
            this.commentService.addComment(this.tempComment, this.document.id);
        }
        else {
            this.commentService.updateComment(this.tempComment);
        }
        this.resetTempComment();
        this.showCommentEditor = false;
        this.updateComments();
    };
    DocumentReaderComponent.prototype.cancelComment = function () {
        this.resetTempComment();
        this.showCommentEditor = false;
    };
    DocumentReaderComponent.prototype.removeComment = function (id) {
        this.commentService.removeComment(id);
        this.updateComments();
    };
    DocumentReaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id;
        this.route.params.forEach(function (params) {
            id = +params['id'];
        });
        this.documentService.getDocument(id)
            .then(function (doc) {
            _this.document = doc;
            _this.commentService.getComments(_this.document.id)
                .then(function (comments) { return _this.comments = comments; });
        });
        this.highlightService.getHighlights(0) // TODO: add user id
            .then(function (highlights) { return _this.highlights = highlights; });
        this.tempComment = new comment_1.Comment(-1, "", "", 100);
        this.showCommentEditor = false;
        // this.addCommentLeft = '1123px'; 
        this.addCommentTop = '100px';
        this.addCommentVisibility = 'hidden';
        this.firstLoad = true;
        this.firstSelectionDone = false;
    };
    DocumentReaderComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        console.log("View checked");
        if (this.txtPresenter != undefined && this.firstLoad) {
            this.globalListenSelectionChange = this.renderer.listenGlobal('document', 'selectionchange', function (event) {
                console.log(event);
                _this.firstSelectionDone = true;
                if (event.path[1].getSelection() != 0 &&
                    _this.isPartOfDocument(event.path[1].getSelection().getRangeAt(0)) &&
                    _this.isRealSelection(event.path[1].getSelection().getRangeAt(0))) {
                    _this.moveAddCommentButton(event.path[1].getSelection().getRangeAt(0));
                }
                else {
                    _this.hideAddCommentButton();
                }
            });
            this.firstLoad = false;
        }
        //this.hltr = new TextHighlighter(txtPresenter);
    };
    DocumentReaderComponent.prototype.isRealSelection = function (sel) {
        return sel.toString().length > 0;
    };
    DocumentReaderComponent.prototype.isPartOfDocument = function (sel) {
        return this.txtPresenter.nativeElement.contains(sel.commonAncestorContainer);
    };
    DocumentReaderComponent.prototype.hideAddCommentButton = function () {
        this.addCommentVisibility = 'hidden';
    };
    DocumentReaderComponent.prototype.moveAddCommentButton = function (range) {
        this.addCommentVisibility = 'visible';
        this.addCommentTop = (range.getBoundingClientRect().top -
            this.documentColumn.nativeElement.getBoundingClientRect().top) + 'px';
    };
    DocumentReaderComponent.prototype.ngOnDestroy = function () {
        // Removes "listenGlobal" listener
        this.globalListenSelectionChange();
    };
    DocumentReaderComponent.prototype.resetTempComment = function () {
        this.tempComment.id = -1;
        this.tempComment.title = "";
        this.tempComment.content = "";
    };
    DocumentReaderComponent.prototype.updateComments = function () {
        var _this = this;
        this.commentService.getComments(this.document.id)
            .then(function (comments) { return _this.comments = comments; });
    };
    DocumentReaderComponent.prototype.initHighlighter = function (color) {
        if (this.hltr == undefined) {
            if (this.document.mimetype == 'text/plain') {
                this.hltr = new TextHighlighter(this.txtPresenter.nativeElement, { color: color });
                this.hltr.unbindEvents();
            }
        }
    };
    DocumentReaderComponent.prototype.highlightButtonPressed = function (highlight) {
        this.initHighlighter(highlight.color);
        // TODO: should only check for range in the document presenter
        if (window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).toString() != "") {
            // A range is selected, highlight it
            this.hltr.setColor(highlight.color);
            this.hltr.doHighlight(); // Normalize?
            return;
        }
        else {
            // No range is selected (Un)bind events and highlight on mouseup/touchend (setting up auto highlighting)
            if (highlight.auto) {
                this.hltr.unbindEvents();
                highlight.auto = false;
            }
            else {
                this.hltr.setColor(highlight.color);
                this.hltr.bindEvents();
                this.highlights.forEach(function (hl) { return hl.auto = false; });
                highlight.auto = true;
            }
        }
    };
    __decorate([
        core_1.ViewChild('txt_presenter'), 
        __metadata('design:type', Object)
    ], DocumentReaderComponent.prototype, "txtPresenter", void 0);
    __decorate([
        core_1.ViewChild('comment_column'), 
        __metadata('design:type', Object)
    ], DocumentReaderComponent.prototype, "commentColumn", void 0);
    __decorate([
        core_1.ViewChild('document_column'), 
        __metadata('design:type', Object)
    ], DocumentReaderComponent.prototype, "documentColumn", void 0);
    DocumentReaderComponent = __decorate([
        core_1.Component({
            //selector: 'document-list',
            providers: [document_service_1.DocumentService, comment_service_1.CommentService, highlight_service_1.HighlightService],
            templateUrl: '../../views/document-reader.html',
            styleUrls: ['../../styles/document-reader.css'],
        }), 
        __metadata('design:paramtypes', [document_service_1.DocumentService, comment_service_1.CommentService, highlight_service_1.HighlightService, router_1.ActivatedRoute, Location, core_1.Renderer])
    ], DocumentReaderComponent);
    return DocumentReaderComponent;
}());
exports.DocumentReaderComponent = DocumentReaderComponent;
//# sourceMappingURL=document-reader.component.js.map