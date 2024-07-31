// Don't put your types in .d.ts files
// https://www.youtube.com/watch?v=zu-EgnbmcLY

export type Auth = {
	id: number;
	name: string;
	email: string;
	email_verified_at: string;
	created_at: string;
	updated_at: string;
};

export type Guest = {
	message: 'Unauthenticated.';
};
