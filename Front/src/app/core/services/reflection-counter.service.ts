import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReflectionCounterService {
  // valor inicial desde localStorage
  count = signal<number>(this.getStoredCount());

  constructor() {
    console.log('🧠 Servicio inicializado. Valor inicial:', this.count());
  }

  private getStoredCount(): number {
    const stored = localStorage.getItem('reflectionCount');
    return stored ? parseInt(stored, 10) : 0;
  }

  private saveCount() {
    localStorage.setItem('reflectionCount', this.count().toString());
  }

  increment() {
    const newValue = this.count() + 1;
    this.count.set(newValue);
    this.saveCount();
    console.log('🧮 Nuevo valor del contador persistente:', newValue);
  }

  reset() {
    this.count.set(0);
    localStorage.setItem('reflectionCount', '0');
    console.log('🔁 Contador reseteado a 0');
  }
}
