import {TalkUserMessage} from '../../../../models';
import {ITalkUserMessage, IUser} from '../../../../interfaces';
import readTalkMessage from '../../../../core/read-talk-message';

/**
 * メッセージを既読にします
 * @param user API利用ユーザー
 * @param messageId 対象のメッセージのID
 */
export default function(
	user: IUser,
	messageId: string
): Promise<void> {
	'use strict';

	return new Promise<void>((resolve, reject) => {
		// 対象のメッセージを取得
		TalkUserMessage.findById(messageId, (findErr: any, message: ITalkUserMessage) => {
			if (findErr !== null) {
				return reject(findErr);
			} else if (message === null) {
				return reject('message-not-found');
			} else if (message.type !== 'user') {
				return reject('message-not-found');
			} else if (message.user.toString() === user.id.toString()) {
				return reject('access-denied');
			} else if (message.otherparty.toString() !== user.id.toString()) {
				return reject('access-denied');
			} else if (message.isDeleted) {
				return reject('this-message-has-been-deleted');
			} else if (message.isRead) {
				return reject('this-message-has-already-been-read');
			}

			readTalkMessage(user, message).then(resolve, reject);
		});
	});
}
