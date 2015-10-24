import { MisskeyExpressRequest } from '../../misskeyExpressRequest';
import { MisskeyExpressResponse } from '../../misskeyExpressResponse';
import getTimeline from '../../endpoints/statuses/timeline';

module.exports = (req: MisskeyExpressRequest, res: MisskeyExpressResponse): void => {
	'use strict';
	getTimeline(req.misskeyUser.id, req.query['limit'], req.query['since-cursor'], req.query['max-cursor']).then((timeline: Object[]) => {
		console.log(timeline);
		res.apiRender(timeline);
	}, (err: any) => {
		res.apiError(500, err);
	});
};
