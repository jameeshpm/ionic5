/** @format */

import { Component } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { PostService } from "../services/post.service";

@Component({
	selector: "app-tab2",
	templateUrl: "tab2.page.html",
	styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
	private posts = [];
	constructor(
		private loadingController: LoadingController,
		private postService: PostService
	) {}

	ngOnInit() {
		this.getPosts();
	}

	async getPosts() {
		const loading = await this.loadingController.create({
			message: "Getting posts from server ...",
		});
		await loading.present();

		this.postService.getPosts(false).subscribe(
			async (posts) => {
				this.posts = posts;
				loading.dismiss();
			},
			async (res) => {
				loading.dismiss();
			}
		);
	}
}
