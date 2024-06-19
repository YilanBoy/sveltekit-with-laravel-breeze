import { expect, test } from '@playwright/test';

test('welcome page can be visited', async ({ page }) => {
	const response = await page.request.get('/');

	await expect(response).toBeOK();
});

test('welcome page has a heading', async ({ page }) => {
	await page.goto('/');

	await expect(
		page.getByRole('heading', { name: '歡迎來到 SvelteKit & Laravel 範例' })
	).toBeVisible();
});

test('welcome page has a login page link', async ({ page }) => {
	await page.goto('/');

	await expect(page.getByRole('link', { name: '登入' })).toBeVisible();
});

test('welcome page has a register page link', async ({ page }) => {
	await page.goto('/');

	await expect(page.getByRole('link', { name: '註冊' })).toBeVisible();
});

test('redirect to login page', async ({ page }) => {
	await page.goto('/');

	await page.getByRole('link', { name: '登入' }).click();

	await page.waitForURL('/login');

	expect(page.url()).toContain('/login');
});

test('redirect to register page', async ({ page }) => {
	await page.goto('/');

	await page.getByRole('link', { name: '註冊' }).click();

	await page.waitForURL('/register');

	expect(page.url()).toContain('/register');
});
