import * as mongoose from 'mongoose';
import config from '../config';

const Schema: typeof mongoose.Schema = mongoose.Schema;

const db: mongoose.Connection = mongoose.createConnection(config.mongo.uri, config.mongo.options);

const schema: mongoose.Schema = new Schema({
	name: { type: String, required: true },
	createdAt: { type: Date, required: true, default: Date.now },
	screenName: { type: String, required: true, unique: true },
	screenNameLower: { type: String, required: true, unique: true, lowercase: true },
	comment: { type: String, required: false, default: null },
	color: { type: String, required: false, default: null },
	description: { type: String, required: false, default: null },
	location: { type: String, required: false, default: null },
	websiteUrl: { type: String, required: false, default: null },
	lang: { type: String, required: true },
	email: { type: String, required: false, sparse: true, default: null },
	encryptedPassword: { type: String, required: true },
	credit: { type: Number, required: true },
	pinnedStatusId: { type: Schema.Types.ObjectId, required: false, default: null },
	birthday: { type: Date, required: false, default: null },
	icon: { type: String, required: false, default: null },
	banner: { type: String, required: false, default: null },
	wallpaper: { type: String, required: false, default: null },
	isVerfied: { type: Boolean, required: false, default: false },
	isEmailVerified: { type: Boolean, required: false, default: false },
	isPro: { type: Boolean, required: false, default: false },
	isPrivate: { type: Boolean, required: false, default: false },
	isDeleted: { type: Boolean, required: false, default: false },
	isSuspended: { type: Boolean, required: false, default: false }
});

// schema.virtual('iconUrl').get(() => `${config.imageServerUrl}/${this.icon}`);

if (!(<any>schema).options.toObject) {
	(<any>schema).options.toObject = {};
}
(<any>schema).options.toObject.transform = (doc: any, ret: any) => {
	ret.id = doc.id;
	delete ret._id;
	delete ret.__v;
	delete ret.screenNameLower;
	delete ret.encryptedPassword;
};

export const User: mongoose.Model<mongoose.Document> = db.model('User', schema, 'Users');

export interface IUser extends mongoose.Document {
	name: string;
	createdAt: Date;
	screenName: string;
	screenNameLower: string;
	comment: string;
	color: string;
	description: string;
	location: string;
	websiteUrl: string;
	lang: string;
	email: string;
	encryptedPassword: string;
	credit: Number;
	pinnedStatusId: mongoose.Types.ObjectId;
	birthday: Date;
	icon: string;
	banner: string;
	wallpaper: string;
	isVerfied: Boolean;
	isEmailVerified: Boolean;
	isPro: Boolean;
	isPrivate: mongoose.Types.ObjectId;
	isDeleted: mongoose.Types.ObjectId;
	isSuspended: mongoose.Types.ObjectId;
}
