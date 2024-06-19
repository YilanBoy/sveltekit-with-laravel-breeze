<script lang="ts">
	import User from '$lib/components/icons/User.svelte';
	import CommercialAt from '$lib/components/icons/CommercialAt.svelte';
	import Lock from '$lib/components/icons/Lock.svelte';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>註冊</title>
</svelte:head>

<div class="h-screen md:flex">
	<div
		class="hidden w-1/2 items-center justify-center overflow-hidden bg-gradient-to-tr from-purple-700 to-blue-500 md:flex lg:flex"
	>
		<div class="size-64">
			<h1 class="font-sans text-4xl font-bold text-gray-50">加入我們</h1>
			<p class="mt-1 text-gray-50">一起攜手創造更酷炫的作品</p>
			<a
				href="/login"
				class="mb-2 mt-4 block w-fit rounded-xl bg-gray-50 px-4 py-2 font-bold text-blue-600 transition duration-200 hover:bg-gray-200 active:bg-gray-300"
				>已經有帳號了？
			</a>
		</div>
	</div>
	<div class="flex items-center justify-center bg-gray-50 py-10 md:w-1/2">
		<form class="bg-gray-50" method="POST">
			{#if form?.error}
				<p class="my-4 text-red-500">{form?.message}</p>
			{/if}
			<h1 class="mb-1 text-2xl font-bold text-gray-800">註冊</h1>
			<p class="mb-7 text-sm font-normal text-gray-600">歡迎你來，很高興認識你</p>
			<div class="mb-4 flex items-center rounded-2xl border-2 px-3 py-2">
				<User classList="size-5 text-gray-400" />
				<input
					class="border-none bg-transparent pl-2 outline-none"
					type="text"
					name="name"
					id="name"
					value={form?.name ?? ''}
					placeholder="Name"
				/>
			</div>
			<div class="mb-4 flex items-center rounded-2xl border-2 px-3 py-2">
				<CommercialAt classList="size-5 text-gray-400" />
				<input
					class="border-none bg-transparent pl-2 outline-none"
					type="text"
					name="email"
					id="email"
					value={form?.email ?? ''}
					placeholder="Email Address"
				/>
			</div>
			<div class="mb-4 flex items-center rounded-2xl border-2 px-3 py-2">
				<Lock classList="h-5 w-5 text-gray-400" />
				<input
					class="border-none bg-transparent pl-2 outline-none"
					type="password"
					name="password"
					id="password"
					placeholder="Password"
				/>
			</div>
			<div class="flex items-center rounded-2xl border-2 px-3 py-2">
				<Lock classList="h-5 w-5 text-gray-400" />
				<input
					class="border-none bg-transparent pl-2 outline-none"
					type="password"
					name="password_confirmation"
					id="password_confirmation"
					placeholder="Confirm Password"
				/>
			</div>
			<button
				type="submit"
				class="mb-2 mt-4 block w-full rounded-2xl bg-blue-500 py-2 font-semibold text-gray-50 transition duration-200 ease-in hover:bg-blue-600 active:bg-blue-700"
			>
				註冊
			</button>
		</form>
	</div>
</div>
