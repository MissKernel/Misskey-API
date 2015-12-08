import * as hapi from 'hapi';
import { IApplication, IUser } from '../../../interfaces';
import show_ from '../../../endpoints/posts/likes/show';

export default function show(
	app: IApplication,
	user: IUser,
	req: hapi.Request,
	res: hapi.IReply
): void {
	'use strict';
	show_(
		user,
		req.payload['post-id'],
		req.payload['limit'],
		req.payload['since-cursor'],
		req.payload['max-cursor']
	).then(posts => {
		res(posts);
	}, (err: any) => {
		res({error: err}).code(500);
	});
}
