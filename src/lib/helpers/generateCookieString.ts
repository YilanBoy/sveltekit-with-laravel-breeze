export default function generateCookieString(cookies: { name: string; value: string }[]): string {
	return cookies
		.filter(({ value }) => value !== '')
		.map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
		.join(';');
}
