<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>儀表板</title>
</svelte:head>

<div class="flex h-screen flex-col items-center justify-center text-gray-950">
	<h1 class="text-4xl"><span class="text-blue-500">{$page.data.user.name}</span>，您好！</h1>
	<form id="logout" action="/logout" method="POST" class="hidden"></form>
	<div class="mt-8 flex flex-col items-start space-y-6">
		<button
			class="text-xl underline decoration-transparent transition duration-300 ease-in-out hover:decoration-inherit"
			type="submit"
			form="logout"
		>
			登出 &rarr;
		</button>
		<a
			class="text-xl underline decoration-transparent transition duration-300 ease-in-out hover:decoration-inherit"
			href="/"
		>
			首頁 &rarr;
		</a>
	</div>
</div>
