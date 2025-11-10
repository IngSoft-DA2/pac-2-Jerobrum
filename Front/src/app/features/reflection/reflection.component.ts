import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ReflectionService } from '../../core/services/reflection.service';
import { ReflectionCounterService } from '../../core/services/reflection-counter.service';

@Component({
  selector: 'app-reflection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reflection.component.html',
  styleUrls: ['./reflection.component.css']
})
export class ReflectionComponent implements OnInit, OnDestroy {
  private sub?: Subscription;

  constructor(
    public service: ReflectionService,
    public counter: ReflectionCounterService,
    private router: Router
  ) {}

  ngOnInit() {
    // Incrementar al entrar o recargar la ruta
    this.counter.increment();

    this.sub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url === '/reflection') {
          this.counter.increment();
        }
      });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  loadDlls() {
    this.service.loadImporters();
  }
}
