/** @format */

import { Injectable } from "@angular/core";

import { Plugins } from "@capacitor/core";
import { HttpClient } from "@angular/common/http";
const { Storage } = Plugins;
const TOKEN_KEY = "my-token";
const TOKEN_USER = "user";

import { map, tap, switchMap } from "rxjs/operators";
import { BehaviorSubject, Observable, from } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class AuthenticationService {
	isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		null
	);
	token = "";

	constructor(private http: HttpClient) {
		this.loadToken();
	}

	async loadToken() {
		const token = await Storage.get({ key: TOKEN_KEY });
		if (token && token.value) {
			console.log("set token: ", token.value);
			this.token = token.value;
			this.isAuthenticated.next(true);
		} else {
			this.isAuthenticated.next(false);
		}
	}

	login(credentials: { email }): Observable<any> {
		return this.http
			.post(`https://jsonplaceholder.typicode.com/users`, credentials)
			.pipe(
				map((data: any) => data),
				switchMap((token) => {
					Storage.set({ key: TOKEN_USER, value: JSON.stringify(token) });
					return from(Storage.set({ key: TOKEN_KEY, value: token.email }));
				}),
				tap((_) => {
					this.isAuthenticated.next(true);
				})
			);
	}

	logout(): Promise<void> {
		this.isAuthenticated.next(false);
		Storage.remove({ key: TOKEN_USER });
		return Storage.remove({ key: TOKEN_KEY });
	}
}
