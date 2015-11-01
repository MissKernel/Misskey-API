import serializeStatus from './serializeStatus';
import {IUser, IPost, IStatus} from '../interfaces';

export default function(timeline: IPost[], me: IUser = null): Promise<Object[]> {
	'use strict';
	return Promise.all(timeline.map((post: IPost) => {
		const type: string = post.type;
		return new Promise((resolve: (obj: Object) => void, reject: (err: any) => void) => {
			switch (type) {
				case 'status':
					serializeStatus(<IStatus>post, me).then((serializedStatus: Object) => {
						resolve(serializedStatus);
					}, (serializeErr: any) => {
						reject(serializeErr);
					});
					break;
				case 'repost':
					resolve(post.toObject());
					break;
				default:
					reject('unknown-timeline-item-type');
					break;
			}
		});
	}));
}
