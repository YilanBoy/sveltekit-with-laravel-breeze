import type { Cookies } from '@sveltejs/kit';
import cookie from 'cookie';

export default function setCookies(setCookies: string[], cookies: Cookies): void {
	setCookies.forEach((setCookie: string): void => {
		const record = cookie.parse(setCookie);
		const cookieName: string = Object.keys(record)[0];

		cookies.set(cookieName, record[cookieName], {
			httpOnly: true,
			maxAge: parseInt(record['Max-Age'] ?? '7200'),
			path: record['path'] ?? '/',
			sameSite: record['samesite'] as boolean | 'lax' | 'strict' | 'none' | undefined
		});
	});
}
