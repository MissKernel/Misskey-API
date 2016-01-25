import {IApplication, IUser} from '../../db/interfaces';
import show from '../../endpoints/posts/show';

export default function(
	app: IApplication,
	user: IUser,
	req: any,
	res: any
): void {
	'use strict';
	show(user, req.payload['post-id']).then(post => {
		res(post);
	}, (err: any) => {
		res({error: err}).code(500);
	});
}
