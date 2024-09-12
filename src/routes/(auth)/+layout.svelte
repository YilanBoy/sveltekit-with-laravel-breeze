<script lang="ts">
	import type { ComponentType } from 'svelte';
	import { page } from '$app/stores';
	import { scale } from 'svelte/transition';
	import XMark from '$lib/components/icons/XMark.svelte';
	import Home from '$lib/components/icons/Home.svelte';
	import Tag from '$lib/components/icons/Tag.svelte';
	import Link from '$lib/components/icons/Link.svelte';
	import Paper from '$lib/components/icons/Paper.svelte';

	interface Category {
		name: string;
		iconComponent: ComponentType;
		url: string;
		isCurrentPage: boolean;
	}

	const menuTitle = 'DocFunc CMS';
	let offCanvasMenuIsOpen = false;
	let dropdownMenuIsOpen = false;
	let categories: Array<Category> = [
		{
			name: 'Dashboard',
			iconComponent: Home,
			url: '',
			isCurrentPage: false
		},
		{
			name: 'Post',
			iconComponent: Paper,
			url: '',
			isCurrentPage: false
		},
		{
			name: 'Tag',
			iconComponent: Tag,
			url: '',
			isCurrentPage: false
		},
		{
			name: 'Link',
			iconComponent: Link,
			url: '',
			isCurrentPage: false
		}
	];
</script>

<div class="h-full bg-white">
	<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
	<div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
		<!-- Off-canvas menu backdrop, show/hide based on off-canvas menu state. -->
		<div
			class="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear"
			class:opacity-100={offCanvasMenuIsOpen}
			class:opacity-0={!offCanvasMenuIsOpen}
			aria-hidden="true"
		></div>

		<div class="fixed inset-0 flex">
			<!-- Off-canvas menu, show/hide based on off-canvas menu state. -->
			<div
				class="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out"
				class:translate-x-0={offCanvasMenuIsOpen}
				class:-translate-x-full={!offCanvasMenuIsOpen}
			>
				<!-- Close button, show/hide based on off-canvas menu state. -->
				<div
					class="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out"
					class:opacity-100={offCanvasMenuIsOpen}
					class:opacity-0={!offCanvasMenuIsOpen}
				>
					<button
						on:click={() => (offCanvasMenuIsOpen = !offCanvasMenuIsOpen)}
						type="button"
						class="-m-2.5 p-2.5"
					>
						<span class="sr-only">Close sidebar</span>
						<XMark className="size-6 text-white" />
					</button>
				</div>

				<!-- Sidebar component, swap this element with another sidebar if you like -->
				<div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
					<div class="flex h-16 shrink-0 items-center">{menuTitle}</div>
					<nav class="flex flex-1 flex-col">
						<ul role="list" class="flex flex-1 flex-col gap-y-7">
							<li>
								<ul role="list" class="-mx-2 space-y-1">
									{#each categories as { name, iconComponent, url, isCurrentPage }}
										<li>
											<a
												href={url}
												class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
												class:bg-gray-50={isCurrentPage}
												class:text-indigo-600={isCurrentPage}
												class:text-gray-700={!isCurrentPage}
												class:hover:text-indigo-600={!isCurrentPage}
												class:hover:bg-gray-50={!isCurrentPage}
											>
												<svelte:component this={iconComponent} className="size-6 shrink-0" />
												{name}
											</a>
										</li>
									{/each}
								</ul>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</div>

	<!-- Static sidebar for desktop -->
	<div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
		<!-- Sidebar component, swap this element with another sidebar if you like -->
		<div
			class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4"
		>
			<div class="flex h-16 shrink-0 items-center">{menuTitle}</div>
			<nav class="flex flex-1 flex-col">
				<ul role="list" class="flex flex-1 flex-col gap-y-7">
					<li>
						<ul role="list" class="-mx-2 space-y-1">
							{#each categories as { name, iconComponent, url, isCurrentPage }}
								<li>
									<a
										href={url}
										class="group flex gap-x-3 rounded-md bg-gray-50 p-2 text-sm font-semibold leading-6 text-indigo-600"
										class:bg-gray-50={isCurrentPage}
										class:text-indigo-600={isCurrentPage}
										class:text-gray-700={!isCurrentPage}
										class:hover:text-indigo-600={!isCurrentPage}
										class:hover:bg-gray-50={!isCurrentPage}
									>
										<svelte:component this={iconComponent} className="size-6 shrink-0" />
										{name}
									</a>
								</li>
							{/each}
						</ul>
					</li>
				</ul>
			</nav>
		</div>
	</div>

	<div class="lg:pl-72">
		<div
			class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
		>
			<button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden">
				<span class="sr-only">Open sidebar</span>
				<svg
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>

			<!-- Separator -->
			<div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true"></div>

			<div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
				<form class="relative flex flex-1" action="#" method="GET">
					<label for="search-field" class="sr-only">Search</label>
					<svg
						class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
							clip-rule="evenodd"
						/>
					</svg>
					<input
						id="search-field"
						class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
						placeholder="Search..."
						type="search"
						name="search"
					/>
				</form>
				<div class="flex items-center gap-x-4 lg:gap-x-6">
					<button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
						<span class="sr-only">View notifications</span>
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
							/>
						</svg>
					</button>

					<!-- Separator -->
					<div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true"></div>

					<!-- Profile dropdown -->
					<div class="relative">
						<button
							on:click={() => (dropdownMenuIsOpen = !dropdownMenuIsOpen)}
							type="button"
							class="-m-1.5 flex items-center p-1.5"
							id="user-menu-button"
							aria-expanded="false"
							aria-haspopup="true"
						>
							<span class="sr-only">Open user menu</span>
							<img
								class="h-8 w-8 rounded-full bg-gray-50"
								src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
								alt=""
							/>
							<span class="hidden lg:flex lg:items-center">
								<span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true"
									>{$page.data.user.name}</span
								>
								<svg
									class="ml-2 h-5 w-5 text-gray-400"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
										clip-rule="evenodd"
									/>
								</svg>
							</span>
						</button>

						<!-- Dropdown menu, show/hide based on menu state. -->
						<div
							transition:scale={{ duration: 150 }}
							class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right transform rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none"
							class:ease-out={dropdownMenuIsOpen}
							class:duration-100={dropdownMenuIsOpen}
							class:opacity-100={dropdownMenuIsOpen}
							class:scale-100={dropdownMenuIsOpen}
							class:ease-in={!dropdownMenuIsOpen}
							class:duration-75={!dropdownMenuIsOpen}
							class:opacity-0={!dropdownMenuIsOpen}
							class:scale-95={!dropdownMenuIsOpen}
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="user-menu-button"
							tabindex="-1"
						>
							<!-- Active: "bg-gray-50", Not Active: "" -->
							<a
								href="#"
								class="block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50"
								role="menuitem"
								tabindex="-1"
								id="user-menu-item-0">Your profile</a
							>
							<form id="logout" action="/logout" method="POST" class="hidden"></form>
							<button
								class="block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900 hover:bg-gray-50"
								type="submit"
								form="logout"
								role="menuitem"
								tabindex="-1"
								id="user-menu-item-1"
							>
								登出
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<main class="py-10">
			<div class="px-4 sm:px-6 lg:px-8">
				<!-- Your content -->
				<slot />
			</div>
		</main>
	</div>
</div>
