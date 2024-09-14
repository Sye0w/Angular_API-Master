import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ErrorHandlingService {

  constructor(private snackBar: MatSnackBar) { }

  handleError(error: HttpErrorResponse){
    let errorMessage = error.error.message;

    this.snackBar.open(errorMessage, 'Close',{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    })

    return throwError(() => new Error (errorMessage));
  }
}
