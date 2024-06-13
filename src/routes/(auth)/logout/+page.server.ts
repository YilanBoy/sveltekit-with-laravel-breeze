import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// we only use this endpoint for the api
	// and don't need to see the page
	redirect(302, '/');
};

export const actions: Actions = {
	default({ cookies }) {
		cookies.getAll().forEach((cookie) => {
			cookies.delete(cookie.name, {
				path: '/'
			});
		});

		redirect(303, '/login');
	}
};
