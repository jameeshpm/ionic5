/** @format */

import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { PostService } from "src/app/services/post.service";

@Component({
	selector: "app-post",
	templateUrl: "./post.page.html",
	styleUrls: ["./post.page.scss"],
})
export class PostPage implements OnInit {
	postForm: FormGroup;
	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private postService: PostService,
		private zone: NgZone
	) {
		this.postForm = this.formBuilder.group({
			title: [""],
			body: [""],
		});
	}

	ngOnInit() {}

	onSubmit() {
		if (!this.postForm.valid) {
			return false;
		} else {
			this.postService.createPost(this.postForm.value).subscribe((response) => {
				this.zone.run(() => {
					this.postForm.reset();
					this.router.navigate(["/tabs/tab1"]);
				});
			});
		}
	}
}
