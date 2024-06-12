import { BACKEND_APP_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	const cookie: string = event.request.headers.get('cookie') ?? '';
	const routeId: string = event.route.id ?? '';

	const userResponse = await event.fetch(`${BACKEND_APP_URL}/api/user`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Cookie: cookie
		}
	});

	if (userResponse.status === 200) {
		// How to extend Locals interface in SvelteKit
		// https://stackoverflow.com/questions/73738077/how-to-extend-locals-interface-in-sveltekit
		event.locals.user = await userResponse.json();
	}

	if (routeId.includes('/login') && event.locals.user) {
		redirect(303, '/dashboard');
	}

	if (routeId.includes('/(auth)/') && !event.locals.user) {
		redirect(303, '/login');
	}

	return resolve(event);
}
