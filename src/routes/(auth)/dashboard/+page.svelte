<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<h1 class="text-4xl text-red-400">Hello {$page.data.user.name}! You are logged in!</h1>
</div>
