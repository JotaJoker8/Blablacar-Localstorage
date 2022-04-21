import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Viaje } from '../models/viaje';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

	usuarios: Usuario[] = [];
  viajes: Viaje[] = [];
  // Variable compartida que se encarga de guardar la info
  private selectedUsuarioSesion!: BehaviorSubject<Usuario>;
  private selectedUsuarios!: BehaviorSubject<Usuario[]>;
  private selectedViajes!: BehaviorSubject<Viaje[]>;
  // Variable que establece un mecanismo para que notifique cada vez que se modifica esa variable compartida
  public observableSelectedUsuario!: Observable<Usuario>;
  public observableSelectedUsuarios!: Observable<Usuario[]>;
  public observableSelectedViajes!: Observable<Viaje[]>;

  constructor() {
    this.selectedUsuarioSesion = new BehaviorSubject<Usuario>(new Usuario);
    this.selectedUsuarios = new BehaviorSubject<Usuario[]>([]);
    this.selectedViajes = new BehaviorSubject<Viaje[]>([]);
    let usuarioJSON: string | null = localStorage.getItem('usuarios');
    if(usuarioJSON){
      // Transformar el JSON a un objeto
      this.usuarios = JSON.parse(usuarioJSON);
      // Inicializar la variable compartida a esa lista de usuarios
      this.selectedUsuarios = new BehaviorSubject<Usuario[]>(this.usuarios);
    }
    this.observableSelectedUsuarios = this.selectedUsuarios.asObservable();
    this.observableSelectedUsuario = this.selectedUsuarioSesion.asObservable();
    let viajeJSON: string | null = localStorage.getItem('viajes');
    if(viajeJSON){
      this.viajes = JSON.parse(viajeJSON);
      this.selectedViajes = new BehaviorSubject<Viaje[]>(this.viajes);
    }
    this.observableSelectedViajes = this.selectedViajes.asObservable();
  }

  agregarUsuarios(usuario: Usuario) {
    // Agregamos primero al array el usuario, porque sino el localStorage estaría vacío
    this.usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    this.selectedUsuarios.next(this.usuarios);
  }

  usuarioConectado(usuario: Usuario) {
    this.selectedUsuarioSesion.next(usuario);
  }

  agregarViajes(viaje: Viaje){
    this.viajes.push(viaje);
    localStorage.setItem('viajes', JSON.stringify(this.viajes));
    this.selectedViajes.next(this.viajes);
  }
}
