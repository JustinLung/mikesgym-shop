<script lang="ts">
	import CartIcon from '$lib/icons/cart.svg?component';
</script>

<header class="flex justify-between items-center px-8">
	<img src="/images/logo-mikesgym.png" alt="Mike's Gym Logo" />
	<nav class="max-w-lg md:flex gap-4 hidden">
		<a href="/">Men</a>
		<a href="/">Women</a>
		<a href="/">Accessories</a>
	</nav>
	<button class="flex md:hidden" type="button" aria-label="Menu Button">
		Menu
	</button>
	<div class="flex gap-4">
		<a
			href="https://mikesgym.com/memberships/"
			target="_blank"
			rel="noreferrer"
			class="bg-mikesgym-yellow text-black font-medium px-6 py-2 uppercase">Become a member</a
		>
		<button><CartIcon /></button>
	</div>
</header>
