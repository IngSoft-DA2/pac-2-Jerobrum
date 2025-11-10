import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReflectionCounterService {
  count = signal(0);

  constructor() {
    console.log('🧠 Nueva instancia de ReflectionCounterService creada');
  }

  increment() {
    this.count.update(c => c + 1);
    console.log('🔢 Contador incrementado. Nuevo valor:', this.count());
  }

  reset() {
    this.count.set(0);
  }
}
