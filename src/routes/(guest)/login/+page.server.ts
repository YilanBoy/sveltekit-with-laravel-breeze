import type { Actions, PageServerLoad } from './$types';
import { type Cookies, fail, redirect } from '@sveltejs/kit';
import { BACKEND_APP_URL } from '$env/static/private';
import cookie from 'cookie';

function setCookies(setCookies: string[], cookies: Cookies) {
	setCookies.forEach((setCookie) => {
		const record = cookie.parse(setCookie);

		cookies.set(Object.keys(record)[0], record[Object.keys(record)[0]], {
			httpOnly: true,
			maxAge: parseInt(record['Max-Age'] ?? '7200'),
			path: record['path'] ?? '/',
			sameSite: record['samesite'] as boolean | 'lax' | 'strict' | 'none' | undefined
		});
	});
}

function generateCookieString(cookies: { name: string; value: string }[]): string {
	let cookie_string = '';

	cookies.forEach((cookie) => {
		cookie_string += `${cookie.name}=${cookie.value};`;
	});

	return cookie_string;
}

export const load: PageServerLoad = async ({ cookies }) => {
	const csrfResponse = await fetch(`${BACKEND_APP_URL}/sanctum/csrf-cookie`, {
		method: 'GET'
	});

	setCookies(csrfResponse.headers.getSetCookie() ?? [], cookies);
};

export const actions = {
	default: async ({ request, cookies, fetch }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (!email) {
			return fail(400, { email, missing: true, message: '請輸入信箱' });
		}

		if (!password) {
			return fail(400, { email, missing: true, message: '請輸入密碼' });
		}

		const cookieString = generateCookieString(cookies.getAll());

		const loginResponse = await fetch(`${BACKEND_APP_URL}/login`, {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
				'X-XSRF-TOKEN': cookies.get('XSRF-TOKEN') as string,
				Cookie: cookieString
			}),
			body: JSON.stringify({
				email: data.get('email'),
				password: data.get('password'),
				remember: data.get('remember')
			})
		});

		setCookies(loginResponse.headers.getSetCookie() ?? [], cookies);

		redirect(303, '/dashboard');
	}
} satisfies Actions;
