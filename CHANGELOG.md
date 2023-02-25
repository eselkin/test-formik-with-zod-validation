# Test Formik with validation by zod
[zod - a validator like Yup](https://github.com/colinhacks/zod)
Why zod and not Yup? Cool things with zod are typescript is handled natively (and it is a neater name)

Why [vite](https://vitejs.dev/) and not create-react-app? I like it more, it is WAY faster!

## Step 0
1. create project with `npm create vite@latest` (this uses React 18 not 17)
2. select that we're using React
3. select that I'm using Typescript (you don't have to)
4. add Formik, zod, and the adapted for zod to be used in Formik `npm install formik zod zod-formik-adapter`
5. remove some of the junk
  1. `public/vite.svg`
  2. `src/App.css`
  3. `src/assets/react.svg`
6. Edit `index.html` - remove line 5 (the icon) - and rename title to: `Test Formik with Zod`
7. Edit `src/App.tsx` - remove lines 10-29, remove line 6, remove lines 1-3 (in that order so the lines match up)