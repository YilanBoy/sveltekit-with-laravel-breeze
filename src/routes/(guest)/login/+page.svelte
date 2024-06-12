<script lang="ts">
	import CommercialAt from '$lib/components/icons/CommercialAt.svelte';
	import Lock from '$lib/components/icons/Lock.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="h-screen md:flex">
	<div
		class="hidden w-1/2 items-center justify-center overflow-hidden bg-gradient-to-tr from-teal-600 to-green-400 md:flex lg:flex"
	>
		<div class="size-64">
			<h1 class="font-sans text-4xl font-bold text-white">開始動手</h1>
			<p class="mt-1 text-white">準備好再次創造新奇的作品嗎？</p>
			<a
				href="/register"
				class="mb-2 mt-4 block w-fit rounded-xl bg-gray-50 px-4 py-2 font-bold text-emerald-600 transition duration-200 hover:bg-gray-200 active:bg-gray-300"
				>還沒有帳號？
			</a>
		</div>
	</div>
	<div class="flex items-center justify-center bg-gray-50 py-10 md:w-1/2">
		<form class="bg-gray-50" method="POST">
			{#if form?.missing}
				<p class="my-4 text-red-500">{form?.message}</p>
			{/if}
			<h1 class="mb-1 text-2xl font-bold text-gray-800">登入</h1>
			<p class="mb-7 text-sm font-normal text-gray-600">歡迎回來，讓我們開始吧</p>
			<div class="mb-4 flex items-center rounded-2xl border-2 px-3 py-2">
				<CommercialAt classList="size-5 text-gray-400" />
				<label for="email" class="hidden"></label>
				<input
					class="border-none bg-transparent pl-2 outline-none"
					type="text"
					name="email"
					id="email"
					value={form?.email ?? ''}
					placeholder="Email Address"
				/>
			</div>
			<div class="flex items-center rounded-2xl border-2 px-3 py-2">
				<Lock classList="h-5 w-5 text-gray-400" />
				<label for="password" class="hidden"></label>
				<input
					class="border-none bg-transparent pl-2 outline-none"
					type="password"
					name="password"
					id="password"
					placeholder="Password"
				/>
			</div>
			<button
				type="submit"
				class="my-4 block w-full rounded-2xl bg-emerald-500 py-2 font-semibold text-gray-50 transition duration-200 ease-in hover:bg-emerald-600 active:bg-emerald-700"
				>登入</button
			>
			<div class="flex items-center justify-between">
				<label class="flex items-center">
					<input
						type="checkbox"
						name="remember"
						id="remember"
						class="size-5 cursor-pointer rounded border-2 border-gray-300 bg-transparent text-emerald-500 focus:ring-emerald-400"
					/>
					<span class="ml-2 text-sm">記住我</span>
				</label>

				<span
					class="ml-2 cursor-pointer text-sm transition duration-200 ease-in hover:text-emerald-600"
				>
					忘記密碼？
				</span>
			</div>
		</form>
	</div>
</div>
