import { Component, OnInit } from '@angular/core';
import { DocumentListElementService } from './document-list-element.service';
import { DocumentListElement } from './document-list-element';
import { Router }   from '@angular/router';

@Component({
    //selector: 'document-list',
    providers: [DocumentListElementService],
    templateUrl: '../../views/document-list.html',
    styleUrls: ['../../styles/document-list.css'],
})
export class DocumentListComponent implements OnInit {

    documentList: DocumentListElement[];
    errorMessage: string;


    constructor(
        private documentListElementService: DocumentListElementService,
        private router: Router
    ) { }

    getDocuments() {
        this.documentListElementService.getDocumentListElements().then(
            documents => this.documentList = documents,
            error => this.errorMessage = <any>error);
    }

    openDocument(id: string) {
        this.router.navigate(['/document', id]);
    }

    ngOnInit() {
        this.getDocuments();
    }
}