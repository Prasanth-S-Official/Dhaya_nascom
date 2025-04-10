import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const url: string = state.url;
    const user = localStorage.getItem('userRole');

    if (user) {
      console.log(user);

      if (this.isAdminRoute(url) && user != 'Admin') {
        console.log("user entering in nutritionist route");
        this.router.navigate(['/error']);
        return false;
      }

      if (this.isCustomerRoute(url) && user != 'User') {
        console.log("nutritionist entering in user route");
        this.router.navigate(['/error']);
        return false;
      }

      if (this.isCommonRoute(url)) {
        return true;
      }

      // Navigate to not found page if user tries to access a page where they do not have access
      return true;
    }

    // Navigate to login page if user is not authenticated
    this.router.navigate(['/login']);
    return false;
  }

  private isAdminRoute(url: string): boolean {
    const adminRoutes = [ 'admin/add/workout', 'admin/view/workout', 'admin/editworkout/:id', 'admin/view/feedback', 'admin/view/requestedworkout'];
    return adminRoutes.some(route => url.includes(route));
  }

  private isCustomerRoute(url: string): boolean {
    const customerRoutes = [ 'user/view/workoutplan', 'user/apply/workout', 'user/view/feedback', 'user/add/feedback', 'user/view/workout'];
    return customerRoutes.some(route => url.includes(route));
  }

  private isCommonRoute(url: string): boolean {
    const commonRoutes = ['', 'login','signup'];
    return commonRoutes.some(route => url.includes(route));
  }
}

//final
