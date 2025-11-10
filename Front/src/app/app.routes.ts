import { Routes } from '@angular/router';
import { ConsignaComponent } from './shared/components/consigna/consigna.component';
import { ReflectionComponent } from './features/reflection/reflection.component';
import { reflectionGuard } from './core/guards/reflection.guard';

export const routes: Routes = [
  { path: '', component: ConsignaComponent, pathMatch: 'full' },
  { path: 'reflection', component: ReflectionComponent, canActivate: [reflectionGuard] },
  { path: '**', redirectTo: '' }
];
