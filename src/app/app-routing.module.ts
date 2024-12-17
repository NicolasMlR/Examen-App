import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginProfePageModule)
  },
  {
    path: 'restaurar-pass',
    loadChildren: () => import('./restaurar-pass/restaurar-pass.module').then( m => m.RestaurarPassPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'error-404',
    loadChildren: () => import('./error-404/error-404.module').then( m => m.Error404PageModule)
  },
  {
    path: 'dashboard-profesor',
    loadChildren: () => import('./dashboard-profesor/dashboard-profesor.module').then( m => m.DashboardProfesorPageModule)
  },
  {
    path: 'dashboard-estudiante',
    loadChildren: () => import('./dashboard-estudiante/dashboard-estudiante.module').then( m => m.DashboardEstudiantePageModule)
  },
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
