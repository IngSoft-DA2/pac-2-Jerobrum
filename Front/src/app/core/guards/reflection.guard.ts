import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ReflectionCounterService } from '../services/reflection-counter.service';

export const reflectionGuard: CanActivateFn = () => {
  const counter = inject(ReflectionCounterService);
  const router = inject(Router);

  console.log('🧠 reflectionGuard ejecutado. Valor actual:', counter.count());

  if (counter.count() > 20) {
    alert('🚫 Acceso bloqueado: superaste el límite de 20 accesos.');
    return router.parseUrl('/');
  }

  return true;
};
