This is a typical component file structure. 
You will notice the following:

- `component-name.css` is a straight-forward CSS file 
  imported by your stateless view component.
- `component-name.scss` is a straight-forward SASS file imported by your stateless view component.
- `component-name-styles.js` is your JSS. I’ve used this file extensively for storing Material UI withStyles higher-order-components and JSS.
- `index.js` is your entry point for importing your component. It contains nothing but export { default as ComponentName } from './component-name'; and any TypeScript types needed to mount your component.

---------------------------------------

***Note***:

Child components should be in the order of maximum allowed (i.e. No grandsons allowed <--> component of the component of the component)
