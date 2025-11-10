import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReflectionService {
  dlls = signal<string[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  loadImporters() {
    this.isLoading.set(true);
    this.error.set(null);

    this.http.get<string[]>('/api/reflection/importers')
      .pipe(
        catchError(() => {
          this.error.set('Error al cargar las DLLs');
          return of([]);
        })
      )
      .subscribe(data => {
        this.dlls.set(data);
        this.isLoading.set(false);
      });
  }
}
