import { describe, expect, it } from 'vitest';
import generateCookieString from './generateCookieString';

describe('Cookie helper', () => {
	it('can generate the cookie string', () => {
		const cookies = [
			{
				name: 'cookie-1',
				value: 'apple'
			},
			{
				name: 'cookie-2',
				value: 'banana'
			}
		];

		expect(generateCookieString(cookies)).toBe('cookie-1=apple;cookie-2=banana;');
	});
});
