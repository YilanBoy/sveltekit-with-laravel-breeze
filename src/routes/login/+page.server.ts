import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { API_URL } from '$env/static/private';
import generateCookieString from '$lib/helpers/generateCookieString';
import cookie from 'cookie';

export const actions = {
	default: async ({ request, cookies, fetch }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (!email) {
			return fail(400, { email, error: true, message: '請輸入信箱' });
		}

		if (!password) {
			return fail(400, { email, error: true, message: '請輸入密碼' });
		}

		const cookieString: string = generateCookieString(cookies.getAll());

		const loginResponse = await fetch(`${API_URL}/login`, {
			method: 'POST',
			headers: new Headers({
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-XSRF-TOKEN': cookies.get('XSRF-TOKEN') ?? '',
				Cookie: cookieString
			}),
			body: JSON.stringify({
				email: data.get('email'),
				password: data.get('password'),
				remember: data.get('remember')
			})
		});

		if (loginResponse.status !== 204) {
			const loginResponseJson = await loginResponse.json();

			return fail(400, { email, error: true, message: loginResponseJson.message });
		}

		const setCookies = loginResponse.headers.getSetCookie();

		for (const setCookie of setCookies) {
			const record = cookie.parse(setCookie);
			const cookieName: string = Object.keys(record)[0];

			cookies.set(cookieName, record[cookieName], {
				httpOnly: true,
				maxAge: parseInt(record['Max-Age'] ?? '7200'),
				path: record['path'] ?? '/',
				sameSite: record['samesite'] as boolean | 'lax' | 'strict' | 'none' | undefined
			});
		}

		redirect(303, '/dashboard');
	}
} satisfies Actions;
