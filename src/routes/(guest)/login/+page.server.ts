import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import cookie from 'cookie';

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (!email) {
			return fail(400, { email, missing: true, message: '請輸入信箱' });
		}

		if (!password) {
			return fail(400, { email, missing: true, message: '請輸入密碼' });
		}

		const csrfResponse = await fetch(`${BACKEND_URL}/sanctum/csrf-cookie`, {
			method: 'GET'
		});

		let setCookies = csrfResponse.headers.getSetCookie() ?? [];

		let xsrfToken = '';
		let laravelSession = '';

		setCookies.forEach((setCookie) => {
			const record = cookie.parse(setCookie);

			if (Object.keys(record).includes('XSRF-TOKEN')) {
				xsrfToken = record['XSRF-TOKEN'];
			}

			if (Object.keys(record).includes('laravel_session')) {
				laravelSession = record['laravel_session'];
			}
		});

		const loginResponse = await fetch(`${BACKEND_URL}/login`, {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
				'X-XSRF-TOKEN': xsrfToken,
				Cookie: `XSRF-TOKEN=${xsrfToken};laravel_session=${laravelSession}`
			}),
			body: JSON.stringify({
				email: data.get('email'),
				password: data.get('password'),
				remember: data.get('remember')
			})
		});

		setCookies = loginResponse.headers.getSetCookie() ?? [];

		setCookies.forEach((setCookie) => {
			const record = cookie.parse(setCookie);

			if (Object.keys(record).includes('XSRF-TOKEN')) {
				xsrfToken = record['XSRF-TOKEN'];
			}

			if (Object.keys(record).includes('laravel_session')) {
				laravelSession = record['laravel_session'];
			}
		});

		const userResponse = await fetch(`${BACKEND_URL}/api/user`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Cookie: `XSRF-TOKEN=${xsrfToken};laravel_session=${laravelSession}`
			}
		});

		console.log(userResponse);
	}
} satisfies Actions;
