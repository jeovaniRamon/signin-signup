import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {JwtResponse } from '../models/jwt-response'
import { tap } from 'rxjs/operators';
import { Observable,BehaviorSubject } from 'rxjs';
import { JitEmitterVisitor } from '@angular/compiler/src/output/output_jit';

@Injectable()

export class AuthService{
    AUTH_SERVER: string = 'http://localhost:4000';
    authSubject = new BehaviorSubject(false);
    private token : string;
    contructor(private httpClient: HttpClient){}

    register(user: User): Observable<JwtResponse>{
        return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/register`,
        user).pipe(tap(
            (res:JwtResponse) => {
                if(res){
                    //guardar token
                    this.guardar_token(res.dataUser.accessToken, res.dataUser.expiresIn)
                }
            })
            );
    }
    login(user: User): Observable<JwtResponse>{
        return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/login`,
        user).pipe(tap(
            (res:JwtResponse) => {
                if(res){
                    //guardar token
                    this.guardar_token(res.dataUser.accessToken, res.dataUser.expiresIn)
                }
            })
            );
    }

    logout(): void {
        this.token= '';
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("EXPIRES_IN");

    }
    private guardar_token(token: string, expiresIn: string):void{
        localStorage.setItem("ACCESS_TOKEN",token);
        localStorage.setItem("EXPIRES_IN",expiresIn);
        this.token = token;
    }
    private getToken(){
        if(!this.token){
            this.token = localStorage.getItem("ACCESS_TOKEN");
        }
        return this.token;
    }
}