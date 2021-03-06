import {IApplication, IUser} from '../../../db/interfaces';
import filesStream from '../../../endpoints/album/files/stream';

export default function(
	app: IApplication,
	user: IUser,
	req: any,
	res: any
): void {
	filesStream(
		user,
		req.payload['folder-id'],
		req.payload['limit'],
		req.payload['since-id'],
		req.payload['max-id']
	).then(files => {
		res(files);
	}, (err: any) => {
		res({error: err}).code(500);
	});
}
