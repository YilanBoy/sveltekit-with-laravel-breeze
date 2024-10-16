import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import generateCookieString from '$lib/helpers/generateCookieString';
import { API_URL } from '$env/static/private';

export const load: PageServerLoad = async () => {
	// we only use this endpoint for the api
	// and don't need to see the page
	redirect(302, '/');
};

export const actions = {
	default: async ({ fetch, cookies }) => {
		await fetch(`${API_URL}/logout`, {
			method: 'POST',
			headers: new Headers({
				'X-XSRF-TOKEN': cookies.get('XSRF-TOKEN') ?? '',
				Cookie: generateCookieString(cookies.getAll())
			})
		});

		redirect(303, '/login');
	}
} satisfies Actions;
