import * as mongoose from 'mongoose';
// import mongooseAutoIncrement from 'mongoose-auto-increment';
const mongooseAutoIncrement: any = require('mongoose-auto-increment');
import config from '../config';

const Schema: typeof mongoose.Schema = mongoose.Schema;

export default (db: mongoose.Connection) => {
	mongooseAutoIncrement.initialize(db);

	const schema: mongoose.Schema = new Schema({
		app: { type: Schema.Types.ObjectId, required: false, default: null, ref: 'Applications' },
		createdAt: { type: Date, required: true, default: Date.now },
		cursor: { type: Number },
		dataSize: { type: Number, required: true },
		folder: { type: Schema.Types.ObjectId, required: false, default: null, ref: 'AlbumFolders' },
		mimeType: { type: String, required: true },
		hash: { type: String, required: false, default: null },
		isDeleted: { type: Boolean, required: false, default: false },
		isHidden: { type: Boolean, required: false, default: false },
		isPrivate: { type: Boolean, required: false, default: false },
		name: { type: String, required: true },
		properties: { type: Schema.Types.Mixed, required: false, default: null },
		serverPath: { type: String, required: true },
		user: { type: Schema.Types.ObjectId, required: true, ref: 'Users' }
	});

	if (!(<any>schema).options.toObject) {
		(<any>schema).options.toObject = {};
	}
	(<any>schema).options.toObject.transform = (doc: any, ret: any) => {
		ret.id = doc.id;
		ret.url = `${config.userContentsServer.url}/${doc.serverPath}`;
		delete ret._id;
		delete ret.__v;
	};

	// Auto increment
	schema.plugin(mongooseAutoIncrement.plugin, {
		model: 'AlbumFile',
		field: 'cursor'
	});

	return db.model('AlbumFile', schema, 'AlbumFiles');
}