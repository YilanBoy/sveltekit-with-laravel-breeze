import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { API_URL } from '$env/static/private';
import setCookies from '$lib/helpers/setCookies';
import generateCookieString from '$lib/helpers/generateCookieString';

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

		const csrfResponse = await fetch(`${API_URL}/sanctum/csrf-cookie`, {
			method: 'GET'
		});

		setCookies(csrfResponse.headers.getSetCookie(), cookies);

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

			return fail(400, { password, error: true, message: loginResponseJson.message });
		}

		setCookies(loginResponse.headers.getSetCookie(), cookies);

		redirect(303, '/dashboard');
	}
} satisfies Actions;
