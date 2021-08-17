/** @format */

import { Component } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { Router } from "@angular/router";
@Component({
	selector: "app-tabs",
	templateUrl: "tabs.page.html",
	styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
	constructor(
		private authService: AuthenticationService,
		private router: Router
	) {}

	async logout() {
		await this.authService.logout();
		this.router.navigateByUrl("/", { replaceUrl: true });
	}
}
