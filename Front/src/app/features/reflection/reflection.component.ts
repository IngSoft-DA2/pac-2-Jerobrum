import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReflectionService } from '../../core/services/reflection.service';
import { ReflectionCounterService } from '../../core/services/reflection-counter.service';

@Component({
  selector: 'app-reflection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reflection.component.html',
  styleUrls: ['./reflection.component.css']
})
export class ReflectionComponent implements OnInit {

  constructor(
    public service: ReflectionService,
    public counter: ReflectionCounterService
  ) {}

  ngOnInit() {
    // se suma solo al entrar realmente a la ruta
    this.counter.increment();
    console.log('🔢 Contador incrementado. Nuevo valor:', this.counter.count());
  }

  loadDlls() {
    this.service.loadImporters();
  }
}
