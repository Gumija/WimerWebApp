"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var user_service_1 = require('./Service/user.service');
var AddUserComponent = (function () {
    function AddUserComponent(userService) {
        this.userService = userService;
    }
    AddUserComponent.prototype.updateList = function () {
        var _this = this;
        this.userService.getUsers().subscribe(function (users) { return _this.users = users; }, function (error) { return _this.errorMessage = error; });
    };
    AddUserComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers().subscribe(function (users) { return _this.users = users; }, function (error) { return _this.errorMessage = error; });
    };
    AddUserComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    AddUserComponent = __decorate([
        core_1.Component({
            selector: 'add-user',
            providers: [user_service_1.UserService],
            templateUrl: '../views/adduser.html',
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], AddUserComponent);
    return AddUserComponent;
}());
exports.AddUserComponent = AddUserComponent;
//# sourceMappingURL=add.user.component.js.map