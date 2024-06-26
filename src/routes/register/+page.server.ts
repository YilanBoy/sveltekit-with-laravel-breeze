import { API_URL } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import generateCookieString from '$lib/helpers/generateCookieString';
import type { Actions } from './$types';
import cookie from 'cookie';

export const actions = {
	default: async ({ request, cookies, fetch }) => {
		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const password = data.get('password');
		const password_confirmation = data.get('password_confirmation');

		if (!name) {
			return fail(400, { name, email, error: true, message: '請輸入名稱' });
		}

		if (!email) {
			return fail(400, { name, email, error: true, message: '請輸入信箱' });
		}

		if (!password) {
			return fail(400, { name, email, error: true, message: '請輸入密碼' });
		}

		if (!password_confirmation) {
			return fail(400, { name, email, error: true, message: '請輸入密碼確認' });
		}

		if (password !== password_confirmation) {
			return fail(400, { name, email, error: true, message: '密碼確認欄位的輸入不一致' });
		}

		const cookieString: string = generateCookieString(cookies.getAll());

		const registerResponse = await fetch(`${API_URL}/register`, {
			method: 'POST',
			headers: new Headers({
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-XSRF-TOKEN': cookies.get('XSRF-TOKEN') ?? '',
				Cookie: cookieString
			}),
			body: JSON.stringify({
				name: data.get('name'),
				email: data.get('email'),
				password: data.get('password'),
				password_confirmation: data.get('password_confirmation')
			})
		});

		if (registerResponse.status !== 204) {
			const registerResponseJson = await registerResponse.json();
			return fail(400, { name, email, error: true, message: registerResponseJson.message });
		}

		const setCookies = registerResponse.headers.getSetCookie();

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
