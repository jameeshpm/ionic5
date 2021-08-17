/** @format */

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../services/authentication.service";
import { AlertController, LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
	selector: "app-login",
	templateUrl: "./login.page.html",
	styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
	credentials: FormGroup;

	constructor(
		private fb: FormBuilder,
		private authService: AuthenticationService,
		private alertController: AlertController,
		private router: Router,
		private loadingController: LoadingController
	) {}

	ngOnInit() {
		this.credentials = this.fb.group({
			email: ["eve.holt@reqres.in", [Validators.required, Validators.email]],
		});
	}

	async login() {
		const loading = await this.loadingController.create();
		await loading.present();

		this.authService.login(this.credentials.value).subscribe(
			async (res) => {
				await loading.dismiss();
				this.router.navigateByUrl("/tabs", { replaceUrl: true });
			},
			async (res) => {
				await loading.dismiss();
				const alert = await this.alertController.create({
					header: "Login failed",
					message: res.error.error,
					buttons: ["OK"],
				});

				await alert.present();
			}
		);
	}

	get email() {
		return this.credentials.get("email");
	}
}