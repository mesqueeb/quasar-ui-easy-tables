# Quasar Easy Tables 🪑 (ノಠ益ಠ)ノ彡┻━┻

[![npm](https://img.shields.io/npm/v/quasar-ui-easy-tables.svg?label=quasar-ui-easy-tables)](https://www.npmjs.com/package/quasar-ui-easy-tables)
[![npm](https://img.shields.io/npm/dt/quasar-ui-easy-tables.svg)](https://www.npmjs.com/package/quasar-ui-easy-tables)

- Demo: [quasar-easy-tables.web.app](http://quasar-easy-tables.web.app)
- Support: [jump to support ↓](#support)

# Installation

## Vue project

```bash
npm i quasar-ui-easy-tables
npm i quasar-ui-easy-forms # peer dependency
```

## Quasar CLI project

Install the [App Extension](../app-extension).

# Usage

Create and register a boot file:

```js
import Vue from 'vue'
import Plugin from 'quasar-ui-easy-tables'

Vue.use(Plugin)
```

**OR**:

```html
<script>
import { Component as EasyTable } from 'quasar-ui-easy-tables'

export default {
  components: {
    EasyTable
  }
}
</script>
```

## Vue CLI project

```js
import Vue from 'vue'
import Plugin from 'quasar-ui-easy-tables'

Vue.use(Plugin)
```

**OR**:

```html
<script>
import { Component as EasyTable } from 'quasar-ui-easy-tables'

export default {
  components: {
    EasyTable
  }
}
</script>
```

## UMD variant

Exports `window.easyTables`.

Add the following tag(s) after the Quasar ones:

```html
<body>
  <!-- at end of body, AFTER Quasar script(s): -->
  <script src="https://cdn.jsdelivr.net/npm/quasar-ui-easy-tables/dist/index.umd.min.js"></script>
</body>
```

# Setup
```bash
$ yarn
```

# Developing
```bash
# start dev in SPA mode
$ yarn dev

# start dev in UMD mode
$ yarn dev:umd

# start dev in SSR mode
$ yarn dev:ssr

# start dev in Cordova iOS mode
$ yarn dev:ios

# start dev in Cordova Android mode
$ yarn dev:android

# start dev in Electron mode
$ yarn dev:electron
```

# Building package
```bash
$ yarn build
```

# Adding Testing Components
in the `ui/dev/src/pages` you can add Vue files to test your component/directive. When using `yarn dev` to build the UI, any pages in that location will automatically be picked up by dynamic routing and added to the test page.

# Adding Assets
If you have a component that has assets, like language or icon-sets, you will need to provide these for UMD. In the `ui/build/script.javascript.js` file, you will find a couple of commented out commands that call `addAssets`. Uncomment what you need and add your assets to have them be built and put into the `ui/dist` folder.

# Support

If this helped you in any way, you can contribute to the package's long term survival by supporting me:

### [💜 Support my open-source work on GitHub](https://github.com/sponsors/mesqueeb)

Be sure to check out my sponsor page, I have a lot of open-source packages that might help you!

(GitHub currently **doubles your support**! So if you support me with $10/mo, I will $20 instead! They're alchemists 🦾😉)

Thank you so much!!!

# License
MIT (c) Luca Ban - Mesqueeb
