import {IApplication, IUser} from '../../../db/interfaces';
import replies from '../../../endpoints/posts/replies/show';

export default function(
	app: IApplication,
	user: IUser,
	req: any,
	res: any
): void {
	replies(
		user,
		req.payload['post-id'],
		req.payload['limit'],
		req.payload['since-id'],
		req.payload['max-id']
	).then(post => {
		res(post);
	}, (err: any) => {
		res({error: err}).code(500);
	});
}
