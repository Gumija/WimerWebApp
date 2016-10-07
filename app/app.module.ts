import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar.component';
import { ListDocumentComponent } from './listdocument.component';
import { DocumentService } from './document-reader/document.service';
import { HighlightService } from './document-reader/highlight.service';
import { DocumentReaderComponent } from './document-reader/document-reader.component';
import { CommentService } from './document-reader/comment.service';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentListElementService } from './document-list/document-list-element.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    DocumentListComponent,
    NavBarComponent,
    ListDocumentComponent,
    DocumentReaderComponent,
    DocumentListComponent,
  ],
  providers: [
    DocumentService,
    HighlightService,
    CommentService,
    DocumentListElementService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }