import * as mongoose from 'mongoose';
// import mongooseAutoIncrement from 'mongoose-auto-increment';
const mongooseAutoIncrement: any = require('mongoose-auto-increment');
// import config from '../config';

const Schema: typeof mongoose.Schema = mongoose.Schema;

export default (db: mongoose.Connection) => {
	mongooseAutoIncrement.initialize(db);

	const schema: mongoose.Schema = new Schema({
		createdAt: { type: Date, required: true, default: Date.now },
		cursor: { type: Number },
		name: { type: String, required: true },
		parent: { type: Schema.Types.ObjectId, required: false, default: null, ref: 'AlbumFolders' },
		user: { type: Schema.Types.ObjectId, required: true, ref: 'Users' }
	});

	if (!(<any>schema).options.toObject) {
		(<any>schema).options.toObject = {};
	}
	(<any>schema).options.toObject.transform = (doc: any, ret: any) => {
		ret.id = doc.id;
		delete ret._id;
		delete ret.__v;
	};

	// Auto increment
	schema.plugin(mongooseAutoIncrement.plugin, {
		model: 'AlbumFolder',
		field: 'cursor'
	});

	return db.model('AlbumFolder', schema, 'AlbumFolders');
}