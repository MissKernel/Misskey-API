import {IApplication, IUser} from '../../interfaces';
import create from '../../endpoints/posts/repost';

export default function(
	app: IApplication,
	user: IUser,
	req: any,
	res: any
): void {
	'use strict';
	create(
		app,
		user,
		req.payload['post-id']
	).then(repost => {
		res(repost);
	}, (err: any) => {
		res({error: err}).code(500);
	});
}
