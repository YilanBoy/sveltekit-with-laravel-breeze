import { expect, test } from '@playwright/test';

test('user can login', async ({ page }) => {
	await page.goto('/login');

	await page.fill('#email', 'allen@email.com');
	await page.fill('#password', 'Password101');

	await page.click('button[type="submit"]');

	await page.waitForURL('/dashboard');

	expect(page.url()).toBe('http://localhost:4173/dashboard');
});

test("user can't login if email or password is wrong", async ({ page }) => {
	await page.goto('/login');

	await page.fill('#email', 'allen@email.com');
	await page.fill('#password', 'WrongPassword101');

	await page.click('button[type="submit"]');

	const errorMessage = page.locator('text=使用者名稱或密碼錯誤。');
	await errorMessage.waitFor();

	expect(await errorMessage.isVisible()).toBeTruthy();
});
