import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://yurabish.com',
  integrations: [
    starlight({
      title: 'Sairy Hub',
      sidebar: [
        { label: 'About', slug: 'about' },
      ],
    }),
  ],
});