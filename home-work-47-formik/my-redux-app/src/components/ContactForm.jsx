import { useFormik } from "formik";
import { contactSchema } from "../schemas/formSchemas";

export default function ContactForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Форма відправлена:", values);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Ім'я</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="error">{formik.errors.name}</p>
          )}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="error">{formik.errors.email}</p>
          )}
        </div>

        <div className="form-group">
          <label>Phone</label>

          <div className="phone-input">
            <span className="prefix">+380</span>

            <input
              type="tel"
              name="phone"
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/\D/g, "");
                formik.setFieldValue("phone", onlyNumbers);
              }}
              className={
                formik.touched.phone && formik.errors.phone
                  ? "input error"
                  : "input"
              }
            />
          </div>

          {formik.touched.phone && formik.errors.phone && (
            <p className="error">{formik.errors.phone}</p>
          )}
        </div>
      </div>

      <div className="form-group">
        <label>Повідомлення</label>
        <textarea
          name="message"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
        />
        {formik.touched.message && formik.errors.message && (
          <p className="error">{formik.errors.message}</p>
        )}
      </div>

      <button type="submit" className="btn">
        Відправити
      </button>
    </form>
  );
}
