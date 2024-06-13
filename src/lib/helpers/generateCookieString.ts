export default function generateCookieString(cookies: { name: string; value: string }[]): string {
	let cookie_string = '';

	cookies.forEach((cookie) => {
		cookie_string += `${cookie.name}=${cookie.value};`;
	});

	return cookie_string;
}
