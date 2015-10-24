import {Status, IStatus} from '../../models/status';
import {Application, IApplication} from '../../models/application';

/**
 * Statusを作成します
 * @userId: ユーザーID
 * @text: 本文
 */
export default function(app: IApplication, userId: string, text: string, inReplyToStatusId: string = null, attachFileIds: string = null)
		: Promise<Object> {
	'use strict';

	const maxTextLength = 300;
	text = text.trim();

	return new Promise((resolve: (status: Object) => void, reject: (err: any) => void) => {
		if (text.length > maxTextLength) {
			reject('too-long-text');
			return;
		}

		// 直近のStatusを取得
		Status.findOne({userId}).sort('-createdAt').exec((recentStatusFindErr: any, recentStatus: IStatus) => {
			if (recentStatusFindErr !== null) {
				reject(recentStatusFindErr);
				return;
			}

			// 内容が重複していた場合はエラー
			if (recentStatus !== null && recentStatus.text === text) {
				reject('duplicate-content');
				return;
			}

			// 返信先が指定されている場合、返信先のStatusが本当に存在するか確認する
			if (inReplyToStatusId !== undefined && inReplyToStatusId !== null) {
				Status.findById(inReplyToStatusId, (findReplyTargetErr: any, replyTarget: IStatus) => {
					if (findReplyTargetErr !== null) {
						reject(findReplyTargetErr);
						return;
					}
					
					if (replyTarget === null) {
						reject('reply-target-not-found');
					} else {
						create();
					}
				});
			} else {
				create();
			}
		});
		
		function create(): void {
			Status.create({
				appId: app !== null ? app.id : null,
				userId,
				inReplyToStatusId,
				text
			}, (err: any, createdStatus: IStatus) => {
				if (err !== null) {
					reject(err);
				} else {
					resolve(createdStatus.toObject());
				}
			});
		}
	});
}