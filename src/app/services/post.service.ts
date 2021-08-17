/** @format */

import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { HttpClient } from "@angular/common/http";
const { Storage } = Plugins;
const POST_KEY = "my-posts";
const USER_KEY = "user";

import { map, tap, switchMap, retry, catchError } from "rxjs/operators";
import { BehaviorSubject, Observable, from } from "rxjs";

export class Post {
	title: string;
	body: string;
	userId: number;
}

@Injectable({
	providedIn: "root",
})
export class PostService {
	private user = null;
	private userPosts = [];
	constructor(private http: HttpClient) {
		this.getUserProfile();
		this.loadUserPosts();
	}

	getPosts(self): Observable<any> {
		let params = null;
		if (self) params = { userId: this.user.id };

		return this.http
			.get("https://jsonplaceholder.typicode.com/posts", { params })
			.pipe(retry(2));
	}

	createPost(post: Post): Observable<any> {
		post.userId = this.user.id;
		if (this.userPosts) this.userPosts.push(post);

		return from(
			Storage.set({ key: POST_KEY, value: JSON.stringify(this.userPosts) })
		);
	}

	async getUserProfile() {
		const user = await Storage.get({ key: USER_KEY });
		this.user = JSON.parse(user.value);
	}

	async loadUserPosts() {
		const posts = await Storage.get({ key: POST_KEY });
		if (JSON.parse(posts.value)) this.userPosts = JSON.parse(posts.value);
	}

	getLocalUserPosts() {
		this.loadUserPosts;
		return this.userPosts;
	}
}
