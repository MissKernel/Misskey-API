export default [
	{ endpoint: 'login', login: false },
	{ endpoint: 'screenname-available', login: false },
	{ endpoint: 'account/create', login: false },
	{ endpoint: 'account/show', login: true, limitDuration: null, limitMax: null },
	{ endpoint: 'account/name/update', login: true, limitDuration: 1000 * 60 * 60 * 24, limitMax: 10 },
	{ endpoint: 'account/url/update', login: true, limitDuration: 1000 * 60 * 60 * 24, limitMax: 10 },
	{ endpoint: 'account/avatar/update', login: true, limitDuration: 1000 * 60 * 60 * 24, limitMax: 30 },
	{ endpoint: 'account/comment/update', login: true, limitDuration: 1000 * 60 * 60 * 24, limitMax: 30 },
	{ endpoint: 'account/location/update', login: true, limitDuration: 1000 * 60 * 60 * 24, limitMax: 30 },
	{ endpoint: 'notifications/show', login: true, limitDuration: null, limitMax: null },
	{ endpoint: 'notifications/timeline', login: true, limitDuration: null, limitMax: null },
	{ endpoint: 'notifications/unread/count', login: true, limitDuration: null, limitMax: null },
	{ endpoint: 'users/show', login: false },
	{ endpoint: 'users/follow', login: true, limitDuration: 1000 * 60 * 60, limitMax: 100 },
	{ endpoint: 'users/unfollow', login: true, limitDuration: 1000 * 60 * 60, limitMax: 100 },
	{ endpoint: 'users/followings', login: false },
	{ endpoint: 'users/followers', login: false },
	{ endpoint: 'users/recommendations', login: true, limitDuration: null, limitMax: null },
	{ endpoint: 'users/search', login: false },
	{ endpoint: 'users/search-by-screen-name', login: false },
	{ endpoint: 'posts/timeline', login: true, limitDuration: 1000 * 60 * 10, limitMax: 100 },
	{ endpoint: 'posts/user-timeline', login: false },
	{ endpoint: 'posts/mentions', login: true, limitDuration: 1000 * 60 * 10, limitMax: 100 },
	{ endpoint: 'posts/show', login: false },
	{ endpoint: 'posts/talk/show', login: false },
	{ endpoint: 'posts/replies/show', login: false },
	{ endpoint: 'posts/timeline/unread/count', login: true, limitDuration: null, limitMax: null },
	{ endpoint: 'posts/mentions/unread/count', login: true, limitDuration: null, limitMax: null },
	{ endpoint: 'posts/status', login: true, limitDuration: 1000 * 60 * 60, limitMax: 100 },
	{ endpoint: 'posts/photo', login: true, limitDuration: 1000 * 60 * 60, limitMax: 100 },
	{ endpoint: 'posts/like', login: true, limitDuration: 1000 * 60 * 60, limitMax: 100 },
	{ endpoint: 'posts/repost', login: true, limitDuration: 1000 * 60 * 60, limitMax: 30 },
	{ endpoint: 'talks/say', login: true, limitDuration: 1000 * 60 * 60, limitMax: 120 },
	{ endpoint: 'talks/show', login: true, limitDuration: 1000 * 60 * 60, limitMax: 1000 },
	{ endpoint: 'talks/read', login: true, limitDuration: null, limitMax: null },
	{ endpoint: 'talks/stream', login: true, limitDuration: 1000 * 60 * 60, limitMax: 1000 },
	{ endpoint: 'talks/history', login: true, limitDuration: 1000 * 60 * 60, limitMax: 1000 },
	{ endpoint: 'talks/delete', login: true, limitDuration: 1000 * 60 * 60, limitMax: 100 },
	{ endpoint: 'album/files/upload', login: true, limitDuration: 1000 * 60 * 60, limitMax: 100 },
	{ endpoint: 'album/files/show', login: true, limitDuration: null, limitMax: null },
	{ endpoint: 'album/files/list', login: true, limitDuration: null, limitMax: null },
	{ endpoint: 'album/files/move', login: true, limitDuration: null, limitMax: null },
	{ endpoint: 'album/files/rename', login: true, limitDuration: null, limitMax: null },
	{ endpoint: 'album/files/delete', login: true, limitDuration: null, limitMax: null },
	{ endpoint: 'album/folders/create', login: true, limitDuration: 1000 * 60 * 60, limitMax: 50 },
	{ endpoint: 'album/folders/move', login: true, limitDuration: null, limitMax: null },
	{ endpoint: 'album/folders/rename', login: true, limitDuration: null, limitMax: null },
	{ endpoint: 'hashtags/search', login: false }
]
