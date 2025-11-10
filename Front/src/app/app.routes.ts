import { Routes } from '@angular/router';
import { ReflectionComponent } from './features/reflection/reflection.component';
import { reflectionGuard } from './core/guards/reflection.guard';
import { ConsignaComponent } from './shared/components/consigna/consigna.component';

export const routes: Routes = [
  { path: '', component: ConsignaComponent, pathMatch: 'full' },
  { path: 'reflection', component: ReflectionComponent, canActivate: [reflectionGuard] },
  { path: '**', redirectTo: '' }
];
