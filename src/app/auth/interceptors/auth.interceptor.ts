import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token: string | null = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }
  let cloned;

  if (!token && req.url.includes('login') || req.url.includes('signup')) {
    cloned = req.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });
  } else if (token) {
    cloned = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });
  }

  return next(cloned || req);
};
