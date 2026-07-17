# Data visualization examples

This repository publishes small, working data visualization projects without duplicating an Observable Framework installation for every example. Human-authored project files live in directories ending in `_src`; generated, GitHub-hosted sites live in matching `_dist` directories.

## Shared development runtime

Install dependencies once at the repository root:

```sh
npm install
```

List the available Framework projects:

```sh
npm run projects
```

Preview or build one project by its name (without the `_src` suffix):

```sh
npm run dev -- noaa-sea-level-rise
npm run build -- noaa-sea-level-rise
```

Build every source project:

```sh
npm run build:all
```

The root installation and `package-lock.json` are shared by all projects. A root build writes directly to the matching tracked directory—for example, `noaa-sea-level-rise_src` builds into `noaa-sea-level-rise_dist`.

## Using one project independently

Each `_src` directory is also a portable Observable Framework project with its own `package.json` and `observablehq.config.js`. Copy the directory, rename it if desired, and run:

```sh
npm install
npm run dev
npm run build
```

Outside this repository, the standalone build uses a conventional local `dist` directory. Generated dependencies, Framework caches, and standalone `dist` directories are ignored here; the sibling `_dist` directories are intentionally committed for GitHub Pages hosting.

## Repository conventions

- Edit only the source project when changing a Framework example.
- Rebuild the example from the repository root and commit both source and generated output.
- Do not place hand-authored files in `_dist`; Framework replaces the build output.
- Keep standalone HTML examples as single files when Observable Framework is unnecessary.
- A `_dist` directory without a matching `_src` directory is a legacy published example.

## Highlights

- [massgis-aerial-photography](https://aaronkyle.github.io/dataviz/massgis-aerial-photography_dist/index.html)
- [noaa-sea-level-rise](https://aaronkyle.github.io/dataviz/noaa-sea-level-rise_dist/index.html)
- [3Band_CIR_8Bit_Imagery](https://aaronkyle.github.io/dataviz/3Band_CIR_8Bit_Imagery_dist/index.html)
- [noaa-urban-heat-island-mapping](https://aaronkyle.github.io/dataviz/noaa-urban-heat-island-mapping_dist/index.html)
- [ICIMOD_land_cover_nepal](https://aaronkyle.github.io/dataviz/ICIMOD_land_cover_nepal_dist/index.html)
- [PAD-US](https://aaronkyle.github.io/dataviz/PAD-US_dist/index.html)
- [bhutan spatial data](https://aaronkyle.github.io/dataviz/bhutan_dist/index.html)
- [world-bank-gender-data-portal](https://aaronkyle.github.io/dataviz/world-bank-gender-data-portal_dist/index.html)
- [wpda](https://aaronkyle.github.io/dataviz/wpda_dist/index.html)
- [wpda-india](https://aaronkyle.github.io/dataviz/wpda-india_dist/index.html)
