import { z } from 'zod';

const statusSchema = z
	.enum(['available', 'development', 'missing', 'unknown'] as const)
	.optional()
	.refine((val) => val !== undefined, {
		message: 'You need to select one of the options',
	});

const nsfwStatusSchema = z
	.enum(['open', 'depends', 'strict', 'banned', 'unknown'] as const)
	.optional()
	.refine((val) => val !== undefined, {
		message: 'You need to select one of the options',
	});

const featureStatusSchema = z.object({
	status: statusSchema,
	note: z.string().default(''),
});

const featureEntrySchema = z.object({
	text: z.string().min(1, 'Text is required'),
	note: z.string().default(''),
});

const discordDataSchema = z.object({
	textChannels: featureStatusSchema,
	voiceChannels: featureStatusSchema,
	videoChannels: featureStatusSchema,
	customRoles: featureStatusSchema,
	permissionManagement: featureStatusSchema,
	customEmojis: featureStatusSchema,
	screenSharing: featureStatusSchema,
	privateMessages: featureStatusSchema,
});

const appsDataSchema = z.object({
	windows: featureStatusSchema,
	macos: featureStatusSchema,
	linux: featureStatusSchema,
	ios: featureStatusSchema,
	android: featureStatusSchema,
	web: featureStatusSchema,
	xbox: featureStatusSchema,
	playstation: featureStatusSchema,
});

export const alternativeFormSchema = z.object({
	name: z.string().min(1, 'Enter a name').trim(),
	description: z.string().default(''),
	image: z.string().default(''),
	website: z.string().default(''),
	data: z.object({
		pros: z.array(featureEntrySchema).default([]),
		cons: z.array(featureEntrySchema).default([]),
		warnings: z.array(featureEntrySchema).default([]),
		discord: discordDataSchema,
		security: z.object({
			e2ee: featureStatusSchema,
			dataCollection: z.string().default(''),
		}),
		openSource: z.object({
			status: statusSchema,
			note: z.string().default(''),
			repository: z.string().default(''),
		}),
		users: z.object({
			amount: z.coerce.number().min(0).default(0),
		}),
		decentralization: featureStatusSchema,
		country: z.object({
			flag: z.string().default(''),
			name: z.string().default('Unknown'),
			note: z.string().default(''),
		}),
		nsfw: z.object({
			status: nsfwStatusSchema,
			note: z.string().default(''),
		}),
		ai: z.object({
			text: z.string().default(''),
		}),
		apps: appsDataSchema,
	}),
});

export type AlternativeFormValues = z.infer<typeof alternativeFormSchema>;
