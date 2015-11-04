import * as request from 'request';
import {AlbumFile, AlbumFolder} from '../../../models';
import {IUser, IAlbumFile, IAlbumFolder} from '../../../interfaces';
import config from '../../../config';

export default function(user: IUser, fileId: string, name: string)
		: Promise<Object> {
	'use strict';

	return new Promise<Object>((resolve, reject) => {
		AlbumFile.findById(fileId, (findErr: any, file: IAlbumFile) => {
			if (findErr !== null) {
				return reject(findErr);
			}
			if (file === null) {
				return reject('file-not-found');
			}
			if (<string>file.user.toString() !== user.id) {
				return reject('file-not-found');
			}
			request.post({
				url: `http://${config.userContentsServer.ip}:${config.userContentsServer.port}/rename`,
				formData: {
					passkey: config.userContentsServer.passkey,
					'old-path': file.serverPath,
					'new-name': name
				}
			}, (err: any, _: any, path: any) => {
				if (err !== null) {
					return reject(err);
				}
				file.name = name;
				file.serverPath = path;
				file.save((saveErr: any, saved: IAlbumFile) => {
					if (saveErr !== null) {
						return reject(saveErr);
					}
					resolve(saved.toObject());
				});
			});
		});
	});
}
