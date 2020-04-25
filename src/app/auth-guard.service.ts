import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private route: ActivatedRoute) { }

  canActivate(){
    return false
  }
}
