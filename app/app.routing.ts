import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentReaderComponent } from './document-reader/document-reader.component';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/documents',
    pathMatch: 'full'
  },
  {
    path: 'documents',
    component: DocumentListComponent,
  },
  {
    path: 'document/:id',
    component: DocumentReaderComponent
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);