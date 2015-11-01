import {AlbumFile, IAlbumFile} from '../../models/albumFile';
import {AlbumFolder, IAlbumFolder} from '../../models/albumFolder';
import {IUser} from '../../models/user';

/**
 * アルバムのファイルを取得します
 * @user: API利用ユーザー
 * @folderId: 対象フォルダID(nullでルート)
 */
export default function(user: IUser, folderId: string = null)
		: Promise<Object[]> {
	'use strict';

	return new Promise((resolve: (files: Object[]) => void, reject: (err: any) => void) => {
		AlbumFile.find({$and: [{user: user.id}, {folder: folderId}]}, (filesFindErr: any, files: IAlbumFile[]) => {
			if (filesFindErr !== null) {
				reject(filesFindErr);
				return;
			}
			AlbumFolder.find({$and: [{user: user.id}, {parent: folderId}]}, (foldersFindErr: any, folders: IAlbumFolder[]) => {
				if (foldersFindErr !== null) {
					reject(foldersFindErr);
					return;
				}
				const fileObjs: Object[] = files.map((file: IAlbumFile) => {
					const obj: any = file.toObject();
					obj.type = 'file';
					return obj;
				});
				const folderObjs: Object[] = folders.map((folder: IAlbumFolder) => {
					const obj: any = folder.toObject();
					obj.type = 'folder';
					return obj;
				});
				resolve(fileObjs.concat(folderObjs));
			});
		});
	});
}