import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title?: string): void {
    this.toastr.success(message, title, { timeOut: 1000 });
  }

  showError(message: string, title?: string): void {
    this.toastr.error(message, title, { timeOut: 1000 });
  }

  showWarning(message: string, title?: string): void {
    this.toastr.warning(message, title, { timeOut: 1000 });
  }
}
