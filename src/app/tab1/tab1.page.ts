/** @format */

import { Component } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { PostService } from "../services/post.service";
import { Router, NavigationEnd } from "@angular/router";

@Component({
	selector: "app-tab1",
	templateUrl: "tab1.page.html",
	styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
	private posts = [];
	private navigationSubscription;
	constructor(
		private loadingController: LoadingController,
		private postService: PostService,
		private router: Router
	) {}

	ngOnInit() {
		this.navigationSubscription = this.router.events.subscribe((e: any) => {
			// If it is a NavigationEnd event re-initalise the component
			if (e instanceof NavigationEnd) {
				this.getPosts();
			}
		});
	}

	async getPosts() {
		const loading = await this.loadingController.create({
			message: "Getting posts from server ...",
		});
		await loading.present();

		this.postService.getPosts(true).subscribe(
			async (posts) => {
				this.posts = posts;
				const localPosts = this.postService.getLocalUserPosts();
				this.posts = [...this.posts, ...localPosts];
				loading.dismiss();
			},
			async (res) => {
				loading.dismiss();
			}
		);
	}

	ngOnDestroy() {
		if (this.navigationSubscription) {
			this.navigationSubscription.unsubscribe();
		}
	}
}
