/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'mikesgym-yellow': '#FFEE00',
				'mikesgym-orange': '#FFBA00'
			}
		}
	},
	plugins: []
};
