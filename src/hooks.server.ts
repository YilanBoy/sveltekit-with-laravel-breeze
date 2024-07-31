import { API_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import cookie from 'cookie';

type auth = {
	id: number;
	name: string;
	email: string;
	email_verified_at: string;
	created_at: string;
	updated_at: string;
};

type guest = {
	message: 'Unauthenticated.';
};

function isAuthenticated(user: auth | guest): user is auth {
	return (
		(user as auth).id !== undefined &&
		(user as auth).name !== undefined &&
		(user as auth).email !== undefined &&
		(user as auth).email_verified_at !== undefined &&
		(user as auth).created_at !== undefined &&
		(user as auth).updated_at !== undefined
	);
}

export async function handle({ event, resolve }) {
	const cookieString: string = event.request.headers.get('cookie') ?? '';
	const routeId: string = event.route.id ?? '';

	const userResponse = await event.fetch(`${API_URL}/api/user`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Cookie: cookieString
		}
	});

	// user api will also return the csrf token, so we don't need to use csrf token api
	// set cookies in every navigation and page refresh
	// this action can make sure front-end will always have laravel session and xsrf token
	const setCookies = userResponse.headers.getSetCookie();

	for (const setCookie of setCookies) {
		const record = cookie.parse(setCookie);
		const cookieName: string = Object.keys(record)[0];

		event.cookies.set(cookieName, record[cookieName], {
			httpOnly: true,
			maxAge: parseInt(record['Max-Age'] ?? '7200'),
			path: record['path'] ?? '/',
			sameSite: record['samesite'] as boolean | 'lax' | 'strict' | 'none' | undefined
		});
	}

	const user: auth | guest = await userResponse.json();

	if (isAuthenticated(user)) {
		// extend `Locals` interface in SvelteKit
		// https://stackoverflow.com/questions/73738077/how-to-extend-locals-interface-in-sveltekit
		event.locals.user = user;
	}

	if (routeId.includes('/login') && event.locals.user) {
		redirect(303, '/dashboard');
	}

	if (routeId.includes('/register') && event.locals.user) {
		redirect(303, '/dashboard');
	}

	if (routeId.includes('/(auth)/') && !event.locals.user) {
		redirect(303, '/login');
	}

	return resolve(event);
}
