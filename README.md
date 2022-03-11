# yatta

Yet Another Task Tracking App  

This is the new, official version of the app with the same name. The first was experimental and a leanring process for me to test out ideas. After learning about the nature of front end frameworks like React I have a better grasp of the nessesary ingrdients.

## 2022 Redesign

### Modals

The current modal system is a mess and needs to be extracted and streamlined. This is going to be part refactor, part redesign. The current modals live everywhere and there is too much repeat code spread throughout the main components. Currently, there are modals for the following behavior:
* New project
* Rename project / Edit project (probably should be renamed for consistency)
* Delete project (more of a confirmation box)
* New task
* Edit task
* Delete Task (currently has no confirmation box, probably should!)
* Context menu/dropdown for project controls (so I can hide them until needed)  

New and edit modals are very similar between the two sets, where delete only needs to be a confirmation box. The modals themselves should be in the top-middle of the screen on small screens, and in the center for larger screens. The context menu is a special case and needs a different set of behavior, as it should appear in relation to the project it's related to.

### CSS

Since custom web components are being created, I should also leverage the power of the shadow DOM for styling. Current design is mobile focused and some consideration should be made toward the desktop experience.

### Data and display

As of now, the way the project data is stored makes it difficult to do things like sorting, or showing only tasks of a certain date. The date system isn't being utilized for anything. Also, when the data is updated, there is no single system responsible for ensuring the display is up to date, instead that responsibility is spread out and inconsistent.

***

The following tech is being used:
* Vite (as an alternative to Webpack)
* Self-created Components with batteries included

## Issues

```
Issue (Resolved):
   On build, Vite generates invalid paths in index.html. Unsure why this is happening.
Fix:
   Add a period to the start of each path (e.g. '/assets/index.5fdfe616.css' to './assets/index.5fdfe616.css')
Permanent Fix:
   Needed to add --base=./ to the vite build command.
```
