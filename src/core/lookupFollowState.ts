import { UserFollowing } from '../models';
import { IUserFollowing } from '../interfaces';

export default function(meId: string, otherpartyId: string): Promise<boolean> {
	'use strict';
	return new Promise<boolean>((resolve, reject) => {
		UserFollowing.findOne({
			followee: otherpartyId,
			follower: meId
		}, (followingFindErr: any, userFollowing: IUserFollowing) => {
			if (followingFindErr !== null) {
				reject(followingFindErr);
			} else {
				reject(userFollowing !== null);
			}
		});
	});
}