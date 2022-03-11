# yatta
Yet Another Task Tracking App

This is the new, official version of the app with the same name. The first was experimental and a leanring process for me to test out ideas. After learning about the nature of front end frameworks like React I have a better grasp of the nessesary ingrdients.

The following tech is being used:
    * Vite (as an alternative to Webpack)
    * Self-created Components with batteries included

```
Issue (Resolved):
   On build, Vite generates invalid paths in index.html. Unsure why this is happening.
Fix:
   Add a period to the start of each path (e.g. '/assets/index.5fdfe616.css' to './assets/index.5fdfe616.css')
Permanent Fix:
   Needed to add --base=./ to the vite build command.
```
