# Kelas

Upload your MMU class schedule PDF once, then check your timetable any time.
Works offline and can be installed on your phone's home screen.

## Deploy on GitHub Pages

1. Create a new public repository on GitHub, e.g. `kelas`.
2. Upload every file in this folder to the repository root (Add file → Upload files).
3. Go to Settings → Pages. Under "Build and deployment", set Source to
   "Deploy from a branch", choose `main` and `/ (root)`, then Save.
4. After a minute your app is live at `https://<your-username>.github.io/kelas/`.

## Install on your phone

- Android (Chrome): open the link, tap ⋮ → Install app (or Add to Home screen).
- iPhone (Safari): open the link, tap Share → Add to Home Screen.

Then open Kelas from the home screen and upload your PDF there.
On iPhone the installed app has separate storage from Safari,
so upload inside the installed app, not in Safari.

## Which PDF to upload

In CLiC, use the class list version of View My Classes/Schedule:
the one that lists each course with its start and end dates.
The weekly calendar and by-date versions only cover one week.

## Privacy

The PDF is read on the device and never uploaded. Only the parsed timetable
is saved, in that browser's local storage.

## Updating the app

Push changes to the repository. The installed app picks up the new version
the next time it's opened (it loads instantly from cache, then refreshes in
the background). For big changes, also change `CACHE = "kelas-v1"` in `sw.js`
to `kelas-v2` so old cached files are cleared.

## Files

- `index.html`: the whole app (HTML, CSS, JavaScript)
- `manifest.json`: name, icon and full-screen mode for the installed app
- `sw.js`: service worker that keeps the app available offline
- `icon-*.png`, `apple-touch-icon.png`: app icons
