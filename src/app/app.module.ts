import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import{AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database'
import { environment } from 'src/environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import {RouterModule} from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import {NgbModule} from'@ng-bootstrap/ng-bootstrap'
import { AuthGuardService as AuthGuard, AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';

//todo ipmport angularfire2database

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    LoginComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      {path:'', component: HomeComponent},
      {path:'products', component: ProductsComponent},
      {path:'shopping-cart', component: ShoppingCartComponent},
      {path:'login', component: LoginComponent},

      {path:'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      {path:'order-success', component: OrderSuccessComponent,canActivate: [AuthGuard]},
      {path:'my/orders', component: MyOrdersComponent,canActivate: [AuthGuard]},

      {path:'admin/orders', component: AdminOrdersComponent,canActivate: [AuthGuard, AdminAuthGuardService]},
      {path:'admin/products', component: AdminProductsComponent,canActivate: [AuthGuard, AdminAuthGuardService]},
    ]),
  ],
  providers: [AuthGuardService, AuthService, UserService, AdminAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
