import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ReflectionCounterService } from '../services/reflection-counter.service';

export const reflectionGuard: CanActivateFn = (route, state) => {
  const counterService = inject(ReflectionCounterService);
  const router = inject(Router);

  console.log('🧠 reflectionGuard ejecutado. Valor actual:', counterService.count());

  if (counterService.count() > 20) {
    alert('🚫 Acceso bloqueado: superaste el límite de 20 accesos.');
    return router.parseUrl('/');
  }

  return true;
};
