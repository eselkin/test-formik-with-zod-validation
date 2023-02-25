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

//
const Schema = z.object({
  firstName: z
    .string()
    .min(2, "Must be more than 2 characters")
    .max(15, "Must be less than 15 characters"),
  lastName: z
    .string()
    .min(2, "Must be more than 2 characters")
    .max(15, "Must be less than 15 characters"),
  email: z.string().min(1, "Required").email("Invalid email address"),
});

//this gives us a type, just to make it easier to debug
type SchemaType = z.infer<typeof Schema>;

function App() {
  const onSubmit = (values: SchemaType, actions: FormikHelpers<SchemaType>) => {
    // just log the values
    console.log(values);
    // then reset the form
    actions.resetForm();
  };

  const { handleSubmit, touched, values, errors, handleChange } = useFormik({
    initialValues: { firstName: "", lastName: "", email: "" },
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
                  <TextField fullWidth name="firstName" label="First Name" />
                </FormGroup>
                <FormGroup sx={{ mb: 4 }}>
                  <TextField fullWidth name="lastName" label="Last Name" />
                </FormGroup>
                <FormGroup sx={{ mb: 4 }}>
                  <TextField fullWidth name="email" label="Email" />
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
