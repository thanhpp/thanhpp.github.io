// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'thanhpp',
  tagline: 'cerca trova',
  url: 'https://thanhpp.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'thanhpp', // Usually your GitHub org/user name.
  projectName: 'thanhpp.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          id: 'algorithm',
          path: 'algorithm',
          routeBasePath: 'algorithm',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // editUrl: 'https://github.com/thanhpp/thanhpp.github.io/tree/main/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // editUrl: 'https://github.com/thanhpp/thanhpp.github.io/tree/main/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'system-design',
        path: 'system-design',
        routeBasePath: 'system-design',
        sidebarPath: require.resolve('./sidebars.js'),
        // ... other options
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'thanhpp',
        logo: {
          alt: 'thanhpp\'s Logo',
          src: 'img/gopherme-removebg.svg',
        },
        items: [
          {
            to: '/blog', 
            label: 'Blog', 
            position: 'left'
          },
          {
            to: '/algorithm/intro',
            label: 'Algorithm',
            position: 'left',
          },
          {
            to: '/system-design/intro',
            label: 'System Design',
            position: 'left',
          },
          {
            href: 'https://github.com/thanhpp/thanhpp.github.io',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Algorithm',
                to: '/algorithm/intro',
              },
              {
                label: 'System Design',
                to: '/system-design/intro',
              },
            ],
          },
          {
            title: 'Contact me',
            items: [
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/thanhpp/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/thanhpp/',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/yBhpfSKJqq',
              },
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/100004238202227/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} thanhpp. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      image: "static/img/gopherme.png",
    }),
};

module.exports = config;
