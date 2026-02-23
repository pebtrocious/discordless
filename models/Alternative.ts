import mongoose, { Schema, Document, Model } from 'mongoose';

// ────────────────────────────────────────────────
// Interfaces (for better TypeScript support)
// ────────────────────────────────────────────────

export interface IFeatureStatus {
	status: 'available' | 'development' | 'missing' | 'unknown';
	note: string;
}

export interface IFeatureEntry {
	text: string;
	note: string;
}

export interface IDiscordData {
	textChannels: IFeatureStatus;
	voiceChannels: IFeatureStatus;
	videoChannels: IFeatureStatus;
	customRoles: IFeatureStatus;
	permissionManagement: IFeatureStatus;
	customEmojis: IFeatureStatus;
	screenSharing: IFeatureStatus;
	privateMessages: IFeatureStatus;
}

export interface ISecurityData {
	e2ee: IFeatureStatus;
	dataCollection: string;
}

export interface IOpenSourceData {
	status: 'available' | 'development' | 'missing' | 'unknown';
	note: string;
	repository: string;
}

export interface IUserData {
	amount: number;
	rating: number;
	ratingSum: number;
	ratingsCount: number;
}

export interface IDecentralizationData {
	status: 'available' | 'development' | 'missing' | 'unknown';
	note: string;
}

export interface ICountry {
	flag: string;
	name: string;
	note: string;
}

export interface INsfwData {
	status: 'open' | 'depends' | 'strict' | 'banned' | 'unknown';
	note: string;
}

export interface IAIData {
	text: string;
}

export interface IAppsData {
	windows: IFeatureStatus;
	macos: IFeatureStatus;
	linux: IFeatureStatus;
	ios: IFeatureStatus;
	android: IFeatureStatus;
	web: IFeatureStatus;
	xbox: IFeatureStatus;
	playstation: IFeatureStatus;
}

export interface IAlternativeData {
	pros: IFeatureEntry[];
	cons: IFeatureEntry[];
	warnings: IFeatureEntry[];
	discord: IDiscordData;
	security: ISecurityData;
	openSource: IOpenSourceData;
	users: IUserData;
	decentralization: IDecentralizationData;
	country: ICountry;
	nsfw: INsfwData;
	ai: IAIData;
	apps: IAppsData;
}

export interface IAlternative extends Document {
	name: string;
	description: string;
	image: string;
	website: string;
	createdAt: Date;
	updatedAt: Date;
	recommend: number;
	data: IAlternativeData;
}
// ────────────────────────────────────────────────
// Plain / Lean / Serializable version for frontend
// ────────────────────────────────────────────────

export type AlternativeLean = {
	_id: mongoose.Types.ObjectId;
	name: string;
	description: string;
	image: string;
	website: string;
	createdAt: Date;
	updatedAt: Date;
	data: IAlternativeData;
};

// ────────────────────────────────────────────────
// Sub-schemas
// ────────────────────────────────────────────────

const FeatureStatusSchema = new Schema<IFeatureStatus>(
	{
		status: {
			type: String,
			enum: ['available', 'development', 'missing', 'unknown'],
			default: 'unknown',
		},
		note: { type: String, default: '' },
	},
	{ _id: false },
);

const FeatureEntrySchema = new Schema<IFeatureEntry>(
	{
		text: { type: String, default: '' },
		note: { type: String, default: '' },
	},
	{ _id: false },
);

const DiscordDataSchema = new Schema<IDiscordData>(
	{
		textChannels: FeatureStatusSchema,
		voiceChannels: FeatureStatusSchema,
		videoChannels: FeatureStatusSchema,
		customRoles: FeatureStatusSchema,
		permissionManagement: FeatureStatusSchema,
		customEmojis: FeatureStatusSchema,
		screenSharing: FeatureStatusSchema,
		privateMessages: FeatureStatusSchema,
	},
	{ _id: false },
);

const SecurityDataSchema = new Schema<ISecurityData>(
	{
		e2ee: FeatureStatusSchema,
		dataCollection: { type: String, default: '' },
	},
	{ _id: false },
);

const OpenSourceDataSchema = new Schema<IOpenSourceData>(
	{
		status: {
			type: String,
			enum: ['available', 'development', 'missing', 'unknown'],
			default: 'unknown',
		},
		note: { type: String, default: '' },
		repository: { type: String, default: '' },
	},
	{ _id: false },
);

const UserDataSchema = new Schema<IUserData>(
	{
		amount: { type: Number, default: 0 },
		rating: { type: Number, default: 0 },
		ratingSum: { type: Number, default: 0 },
		ratingsCount: { type: Number, default: 0 },
	},
	{ _id: false },
);

const DecentralizationDataSchema = new Schema<IDecentralizationData>(
	{
		status: {
			type: String,
			enum: ['available', 'development', 'missing', 'unknown'],
			default: 'unknown',
		},
		note: { type: String, default: '' },
	},
	{ _id: false },
);

const CountrySchema = new Schema<ICountry>(
	{
		flag: { type: String, default: '' },
		name: { type: String, default: 'Unknown' },
		note: { type: String, default: '' },
	},
	{ _id: false },
);

const NsfwDataSchema = new Schema<INsfwData>(
	{
		status: {
			type: String,
			enum: ['open', 'depends', 'strict', 'banned', 'unknown'],
			default: 'unknown',
		},
		note: { type: String, default: '' },
	},
	{ _id: false },
);

const AIDataSchema = new Schema<IAIData>(
	{
		text: { type: String, default: '' },
	},
	{ _id: false },
);

const AppsDataSchema = new Schema<IAppsData>(
	{
		windows: FeatureStatusSchema,
		macos: FeatureStatusSchema,
		linux: FeatureStatusSchema,
		ios: FeatureStatusSchema,
		android: FeatureStatusSchema,
		web: FeatureStatusSchema,
		xbox: FeatureStatusSchema,
		playstation: FeatureStatusSchema,
	},
	{ _id: false },
);

const AlternativeDataSchema = new Schema<IAlternativeData>(
	{
		pros: [FeatureEntrySchema],
		cons: [FeatureEntrySchema],
		warnings: [FeatureEntrySchema],
		discord: DiscordDataSchema,
		security: SecurityDataSchema,
		openSource: OpenSourceDataSchema,
		users: UserDataSchema,
		decentralization: DecentralizationDataSchema,
		country: CountrySchema,
		nsfw: NsfwDataSchema,
		ai: AIDataSchema,
		apps: AppsDataSchema,
	},
	{ _id: false },
);

// ────────────────────────────────────────────────
// Main Schema
// ────────────────────────────────────────────────

const AlternativeSchema = new Schema<IAlternative>(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		description: {
			type: String,
			default: '',
			trim: true,
		},
		image: {
			type: String,
			default: '',
		},
		website: {
			type: String,
			default: '',
		},
		recommend: {
			type: Number,
			default: 0,
		},
		data: {
			type: AlternativeDataSchema,
			default: () => ({}),
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

AlternativeSchema.index({ name: 1 }, { unique: true });

const Alternative =
	(mongoose.models.Alternative as Model<IAlternative>) ||
	mongoose.model<IAlternative>('Alternative', AlternativeSchema);
export { AlternativeDataSchema };
export default Alternative;
