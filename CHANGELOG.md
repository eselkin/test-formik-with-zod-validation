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

## Step 1
1. in `src/App.tsx` add in a Formik form asking for `firstName, lastName, email, and phone number`
2. We will use Material UI (instead of Reactstrap -- just to show you) - `npm i @mui/material @emotion/react @emotion/styled`
3. Create a schema (schemas in zod, like yup, tell Formik what we expect the data in the form to look like)
    1. `z.object({})` 
        1. objects are generally the form that data will be structured in
        2. so we use z.object to make sure the data comes in that form
    2. 
    ```
           {
              firstName: z.string()
                .min(2, "Must be more than 2 characters")
                .max(15, "Must be less than 15 characters")
            }
    ```
        1. This means the field `firstName` should and have more than 2 characters and less than 15 characters 
4. add a function called `onSubmit` (we will have something called handleSubmit in a moment, so we can't clal it that) 
        1. it has 2 parameters: `values` and `actions`
        2. actions can be really helpful (it can reset the form or change the state so we can show when it's submitting, etc) 
        3. actions actually should be called helpers. But you wouldn't know that if you weren't using typescript
        4. Because this application is using Typescript we have to give values and actions types (in JS you don't need to). 
5. In App.tsx we'll use the hook `useFormik` instead of the components Formik and Form. 
    1. `useFormik` takes an object that has to have the values `onSubmit` and `initialValues` and we'll add one more `validationSchema`.
    2. `useFormik` returns several very useful pieces
        1. `handleSubmit` - a function that makes returning values from a form easy and passes it the "actions" for the form (like reset)
        2. `handleChange` - a function that will update the state that formik creates
        3. `touched` - an object which has 3 keys (firstName, lastName, and email) and a boolean value for each - true when someone clicks in a text field.
        4. `values` - the values for each firstName, lastName, and email inside the formik state
        5. `errors` - the errors for each
        6. There's also handleBlur and a couple of other things.
6. Add a `Container` in the div in `App.tsx` and put a `Paper` component in that
    1. `import Container from "@mui/material/Container";` and `import Paper from "@mui/material/Paper";`
    2. `<Container><Paper>{/* more to come here */}</Paper><Container>`
7. Add a Card component inside the Paper (a Card then takes a CardHeader and CardContent)
    1. `import Card from "@mui/material/Card";`
    2. Then `import CardHeader from "@mui/material/CardHeader";`
    3. Then `import CardContent from "@mui/material/CardContent";`
    4. Then in the Paper 
    ```
    <Card>
      <CardHeader title="Some title" />
      <CardContent>{/* form will go here */}</CardContent>
    </Card>
    ```
7. Add a `form` in the CardContent component
8. Add 3 FormGroups, and put a TextField in all of them (like in Reactstrap, but we're using material UI) inside the form
    1. `import FormGroup from "@mui/material/FormGroup";` and `import TextField from "@mui/material/TextField";`
    2. 
    ```
    <FormGroup>
        <TextField />
    </FormGroup> x3
    ```
    3. Add a little styling to the FormGroups so they separate (in material-ui we do it with sx)
    4. `<FormGroup sx={{marginBottom: 4}}>` or shorthand `<FormGroup sx={{mb: 4}}>`
