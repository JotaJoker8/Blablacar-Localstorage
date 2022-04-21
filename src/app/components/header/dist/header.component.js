"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var usuario_1 = require("src/app/models/usuario");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(router, comunicacionService) {
        this.router = router;
        this.comunicacionService = comunicacionService;
        this.usuario = new usuario_1.Usuario();
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.suscripcionUsuario = this.comunicacionService.observableSelectedUsuario.subscribe(function (usuario) {
            _this.usuario = usuario;
            if (_this.usuario.viajes.length == 0 && _this.usuario.rol == 'Conductor') {
                _this.usuario.saldoConductor = 0;
            }
            if (_this.usuario.viajes.length == 0 && _this.usuario.rol == 'Pasajero') {
                _this.usuario.saldo = 50;
            }
        });
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
        this.suscripcionUsuario.unsubscribe();
    };
    HeaderComponent.prototype.volver = function () {
        this.router.navigateByUrl('');
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
