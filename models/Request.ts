import mongoose, { Schema, Document, Model } from 'mongoose';
import { IAlternativeData, AlternativeDataSchema } from '@/models/Alternative';

// ────────────────────────────────────────────────
// Interfaces
// ────────────────────────────────────────────────

export interface IRequestAlternative {
	name: string;
	description: string;
	image: string;
	website: string;
	recommend: number;
	data: IAlternativeData;
}

export interface IRequest extends Document {
	type: 'add' | 'update';
	alternative: IRequestAlternative;
	createdAt: Date;
	updatedAt: Date;
}

// ────────────────────────────────────────────────
// Sub-schema for the proposed alternative
// ────────────────────────────────────────────────

const RequestAlternativeSchema = new Schema<IRequestAlternative>(
	{
		name: {
			type: String,
			required: true,
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
	{ _id: false },
);

// ────────────────────────────────────────────────
// Main Request Schema
// ────────────────────────────────────────────────

const RequestSchema = new Schema<IRequest>(
	{
		type: {
			type: String,
			enum: ['create', 'update'],
			required: true,
		},
		alternative: {
			type: RequestAlternativeSchema,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

const Request =
	(mongoose.models.Request as Model<IRequest>) ||
	mongoose.model<IRequest>('Request', RequestSchema);

export default Request;
