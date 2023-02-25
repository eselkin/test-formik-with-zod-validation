import { z } from "zod";
import { FormikHelpers, useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

//
const Schema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Must be more than 2 characters" })
    .max(15, { message: "Must be less than 15 characters" }),
  lastName: z
    .string()
    .min(2, "Must be more than 2 characters")
    .max(15, "Must be less than 15 characters"),
  email: z.string().min(1, "Required").email("Invalid email address"),
  phone: z
    .string()
    .regex(/^\d{3}-?\d{3}-?\d{4}$/, { message: "must be a phone number" })
    .transform((value) => value.replace(/-/g, "")),
});

//this gives us a type, just to make it easier to debug
type SchemaType = z.infer<typeof Schema>;

function App() {
  // @ts-ignore
  const onSubmit = (values, actions) => {
    // just log the values
    console.log(values);
    // then reset the form
    actions.resetForm();
  };

  const { handleSubmit, touched, values, errors, handleChange } = useFormik({
    initialValues: { firstName: "", lastName: "", email: "", phone: "" },
    onSubmit: onSubmit,
    validationSchema: toFormikValidationSchema(Schema),
  });

  return (
    <div className="App">
      <Container sx={{ width: "100vw" }}>
        <Paper sx={{ width: 500, mx: "auto" }}>
          <Card>
            <CardHeader
              title="The form"
              sx={{ bgcolor: "red", color: "white", fontWeight: "bold" }}
            />
            <CardContent>
              <form onSubmit={handleSubmit}>
                <FormGroup sx={{ mb: 4 }}>
                  <TextField
                    fullWidth
                    name="firstName"
                    label="First Name"
                    onChange={handleChange}
                    value={values.firstName}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </FormGroup>
                <FormGroup sx={{ mb: 4 }}>
                  <TextField
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    onChange={handleChange}
                    value={values.lastName}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </FormGroup>
                <FormGroup sx={{ mb: 4 }}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    onChange={handleChange}
                    value={values.email}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </FormGroup>
                <FormGroup sx={{ mb: 4 }}>
                  <TextField
                    fullWidth
                    name="phone"
                    label="Phone"
                    onChange={handleChange}
                    value={values.phone}
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </FormGroup>
                <FormGroup sx={{ mb: 4 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={Object.keys(errors).length > 0}
                  >
                    Submit
                  </Button>
                </FormGroup>
              </form>
            </CardContent>
          </Card>
        </Paper>
      </Container>
    </div>
  );
}

export default App;
