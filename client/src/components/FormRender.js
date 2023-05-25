import { Formik } from "formik";

const FormRender = ({
  onSubmit,
  renderForm,
  initialValues,
  errors,
  children,
}) => {
  return (
    <div className="formComponent__container">
      <div className="form__container row d-flex flex-column align-items-center m-0">
        <Formik
          initialValues={initialValues}
          validate={errors}
          onSubmit={onSubmit}
        >
          {renderForm}
        </Formik>
        {children ? <div className="text-center pt-3">{children}</div> : null}
      </div>
    </div>
  );
};

export default FormRender;
