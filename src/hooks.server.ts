import { API_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import cookie from 'cookie';
import type { Auth, Guest } from '$lib/types/user';

function isAuthenticated(user: Auth | Guest): user is Auth {
	return (
		(user as Auth).id !== undefined &&
		(user as Auth).name !== undefined &&
		(user as Auth).email !== undefined &&
		(user as Auth).email_verified_at !== undefined &&
		(user as Auth).created_at !== undefined &&
		(user as Auth).updated_at !== undefined
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

	event.locals.user = await userResponse.json();

	if (routeId.includes('/login') && isAuthenticated(event.locals.user)) {
		redirect(303, '/dashboard');
	}

	if (routeId.includes('/register') && isAuthenticated(event.locals.user)) {
		redirect(303, '/dashboard');
	}

	if (routeId.includes('/(auth)/') && !isAuthenticated(event.locals.user)) {
		redirect(303, '/login');
	}

	return resolve(event);
}
