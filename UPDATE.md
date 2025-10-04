# Update

## Styled-components migration

We are migrating from styled-components to CSS Modules. Use this checklist to track the remaining work and the cleanup tasks.

### Current status

- **Tooling & dependencies**
   - [x] `package.json`: remove `styled-components` and `babel-plugin-styled-components` once no modules import them.
   - [x] `.babelrc`: drop the `styled-components` plugin configuration after the runtime dependency is gone.

- **Application code**
   - [x] `pages/_app.js`: replace `ThemeProvider`, `createGlobalStyle`, and the `Transition` styled wrapper with CSS Modules or plain CSS. Introduce global CSS and CSS custom properties for the theme.
   - [x] `pages/_document.js`: remove the `ServerStyleSheet` integration when styled-components is no longer used.
   - [x] `pages/index.js`: migrate layout, animation keyframes, and background styling to a CSS Module.
   - [x] `pages/about.js`: migrate layout, animation keyframes, and hero copy styling to a CSS Module.
   - [x] `pages/log.js`: migrate log table layout and form controls to CSS Modules.
   - [x] `pages/summary.js`: migrate summary cards, charts, and typography to CSS Modules.
   - [x] `components/entry.js`: migrate log entry layout, state-based modifiers, and button styles to CSS Modules.
   - [x] `components/l10n.js`: migrate button and chip styling to CSS Modules.
   - [x] `components/page.js`: migrate the layout container margin handling to CSS Modules.
   - [x] `components/sidebar.js`: migrate sidebar layout, responsive rules, and active state styling to CSS Modules.
   - [x] `components/timer.js`: migrate timer layout, circular progress, and animation styling to CSS Modules.

### Migration plan

1. **Establish CSS Module baseline**
   - Create a `styles/globals.css` (or equivalent) and import it from `pages/_app.js`.
   - Move global typography, body background, and transition class selectors into this file.

2. **Expose theme values via CSS variables**
   - Translate the `theme.colors` palette and breakpoint in `site.config.js` into `:root` custom properties.
   - Ensure components access colors using `var(--color-one)` instead of `props.theme`.

3. **Component-by-component migration**
   - For each page/component above, create a CSS Module named `<Component>.module.css` in the same directory.
   - Move styled-component rules into the module, replacing dynamic logic with class names and modifier classes.
   - Replace `styled` component usage with semantic HTML elements and `className` bindings.

4. **Handle animations and keyframes**
   - Move `keyframes` declarations into the relevant CSS Module using `@keyframes` and reference them via `animation-name`.
   - Ensure animations previously using props keep their timing via explicit class variants.

5. **Update transitions**
   - Port the `.page-transition-*` selectors used by `CSSTransition` into global CSS so they remain globally accessible.
   - Replace the styled `Transition` wrapper with a simple `div`/`main` using class names.

6. **Cleanup**
   - Delete unused styled-components files, remove `ThemeProvider`, and simplify `_document.js` once no styled-components remain.
   - Remove dependencies and Babel plugin entries, then reinstall packages to verify the bundle no longer pulls styled-components.

### Implementation notes

- Audit each migration to ensure responsive behavior driven by `props.theme.breakpoint` is replicated with media queries using the new CSS custom property.
- Minimize inline styles; prefer modifier classes (e.g., `.zoom`, `.empty`) in CSS Modules.
- After each component migration, verify layouts through `npm run next:build` and the relevant page in development.
- Document any CSS utilities or shared mixins in a follow-up section if patterns emerge during migration.

### Cleanup backlog

- [x] Delete `.babelrc` so Next.js can return to the default SWC pipeline.
- [x] Remove the direct `@babel/core` dependency and refresh the lockfile.
- [x] Remove unused `next-compose-plugins` dependency.
- [x] Delete `site.config.js` now that theme tokens live in `styles/globals.css`.
- [x] Remove `@next/bundle-analyzer` integration from dependencies and `next.config.js`.
- [ ] Double-check for any Babel-specific npm scripts or config files left behind and simplify them if found.
