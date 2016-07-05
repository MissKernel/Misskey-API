import {IApplication, IUser} from '../../../db/interfaces';
import show_ from '../../../endpoints/posts/reposts/show';

export default function(
	app: IApplication,
	user: IUser,
	req: any,
	res: any
): void {
	show_(
		user,
		req.payload['post-id'],
		req.payload['limit'],
		req.payload['since-id'],
		req.payload['max-id']
	).then(posts => {
		res(posts);
	}, (err: any) => {
		res({error: err}).code(500);
	});
}
