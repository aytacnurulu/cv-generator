import styles from "./ResumeForm.module.css";
import { useFormik, getIn } from "formik";
import validationSchema from "../../schemas/validationSchema";

const EMPTY_EDUCATION = {
  institution: "",
  degree: "",
  startDate: "",
  endDate: "",
};
const EMPTY_EXPERIENCE = { company: "", role: "", startDate: "", endDate: "" };
const EMPTY_SKILL = { name: "", level: "" };
const EMPTY_PROJECT = { name: "", description: "" };
const EMPTY_LANGUAGE = { name: "" };

export default function ResumeForm({ setCvData }) {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      summary: "",
      education: [],
      experience: [],
      skills: [],
      projects: [],
      languages: [],
    },
    onSubmit: (values) => {
      setCvData(values);
    },
    validationSchema,
  });

  const addItem = (field, emptyItem) => {
    const nextItems = [...(formik.values[field] || []), { ...emptyItem }];
    formik.setFieldValue(field, nextItems);
  };

  const removeItem = (field, index) => {
    const nextItems = (formik.values[field] || []).filter(
      (_, i) => i !== index,
    );
    formik.setFieldValue(field, nextItems);
  };

  const getArrayFieldError = (fieldPath) => {
    const error = getIn(formik.errors, fieldPath);
    return typeof error === "string" ? error : "";
  };

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              onChange={formik.handleChange}
              value={formik.values.fullName}
            />
            {formik.errors.fullName && (
              <div className={styles.error}>{formik.errors.fullName}</div>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && (
              <div className={styles.error}>{formik.errors.email}</div>
            )}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            {formik.errors.phone && (
              <div className={styles.error}>{formik.errors.phone}</div>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="summary">Summary</label>
            <textarea
              id="summary"
              name="summary"
              onChange={formik.handleChange}
              value={formik.values.summary}
            />
            {formik.errors.summary && (
              <div className={styles.error}>{formik.errors.summary}</div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.wrapper}>
        <h3>Education</h3>
        {formik.values.education.length === 0 && (
          <p>No education entries yet.</p>
        )}
        {formik.values.education.map((item, index) => (
          <div key={`education-${index}`}>
            <label htmlFor={`education[${index}].institution`}>
              Institution
            </label>
            <input
              type="text"
              id={`education[${index}].institution`}
              name={`education[${index}].institution`}
              onChange={formik.handleChange}
              value={item.institution}
            />
            {getArrayFieldError(`education[${index}].institution`) && (
              <div className={styles.error}>
                {getArrayFieldError(`education[${index}].institution`)}
              </div>
            )}

            <label htmlFor={`education[${index}].degree`}>Degree</label>
            <input
              type="text"
              id={`education[${index}].degree`}
              name={`education[${index}].degree`}
              onChange={formik.handleChange}
              value={item.degree}
            />
            {getArrayFieldError(`education[${index}].degree`) && (
              <div className={styles.error}>
                {getArrayFieldError(`education[${index}].degree`)}
              </div>
            )}

            <label htmlFor={`education[${index}].startDate`}>Start Date</label>
            <input
              type="date"
              id={`education[${index}].startDate`}
              name={`education[${index}].startDate`}
              onChange={formik.handleChange}
              value={item.startDate}
            />
            {getArrayFieldError(`education[${index}].startDate`) && (
              <div className={styles.error}>
                {getArrayFieldError(`education[${index}].startDate`)}
              </div>
            )}

            <label htmlFor={`education[${index}].endDate`}>End Date</label>
            <input
              type="date"
              id={`education[${index}].endDate`}
              name={`education[${index}].endDate`}
              onChange={formik.handleChange}
              value={item.endDate}
            />
            {getArrayFieldError(`education[${index}].endDate`) && (
              <div className={styles.error}>
                {getArrayFieldError(`education[${index}].endDate`)}
              </div>
            )}

            <button
              type="button"
              onClick={() => removeItem("education", index)}
            >
              Remove Education
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addItem("education", EMPTY_EDUCATION)}
        >
          Add Education
        </button>
      </div>

      <div className={styles.wrapper}>
        <h3>Experience</h3>
        {formik.values.experience.length === 0 && (
          <p>No experience entries yet.</p>
        )}
        {formik.values.experience.map((item, index) => (
          <div key={`experience-${index}`}>
            <label htmlFor={`experience[${index}].company`}>Company</label>
            <input
              type="text"
              id={`experience[${index}].company`}
              name={`experience[${index}].company`}
              onChange={formik.handleChange}
              value={item.company}
            />
            {getArrayFieldError(`experience[${index}].company`) && (
              <div className={styles.error}>
                {getArrayFieldError(`experience[${index}].company`)}
              </div>
            )}

            <label htmlFor={`experience[${index}].role`}>Role</label>
            <input
              type="text"
              id={`experience[${index}].role`}
              name={`experience[${index}].role`}
              onChange={formik.handleChange}
              value={item.role}
            />
            {getArrayFieldError(`experience[${index}].role`) && (
              <div className={styles.error}>
                {getArrayFieldError(`experience[${index}].role`)}
              </div>
            )}

            <label htmlFor={`experience[${index}].startDate`}>Start Date</label>
            <input
              type="date"
              id={`experience[${index}].startDate`}
              name={`experience[${index}].startDate`}
              onChange={formik.handleChange}
              value={item.startDate}
            />
            {getArrayFieldError(`experience[${index}].startDate`) && (
              <div className={styles.error}>
                {getArrayFieldError(`experience[${index}].startDate`)}
              </div>
            )}

            <label htmlFor={`experience[${index}].endDate`}>End Date</label>
            <input
              type="date"
              id={`experience[${index}].endDate`}
              name={`experience[${index}].endDate`}
              onChange={formik.handleChange}
              value={item.endDate}
            />
            {getArrayFieldError(`experience[${index}].endDate`) && (
              <div className={styles.error}>
                {getArrayFieldError(`experience[${index}].endDate`)}
              </div>
            )}

            <button
              type="button"
              onClick={() => removeItem("experience", index)}
            >
              Remove Experience
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addItem("experience", EMPTY_EXPERIENCE)}
        >
          Add Experience
        </button>
      </div>

      <div className={styles.wrapper}>
        <h3>Skills</h3>
        {formik.values.skills.length === 0 && <p>No skills yet.</p>}
        {formik.values.skills.map((item, index) => (
          <div key={`skill-${index}`}>
            <label htmlFor={`skills[${index}].name`}>Skill</label>
            <input
              type="text"
              id={`skills[${index}].name`}
              name={`skills[${index}].name`}
              onChange={formik.handleChange}
              value={item.name}
            />
            {getArrayFieldError(`skills[${index}].name`) && (
              <div className={styles.error}>
                {getArrayFieldError(`skills[${index}].name`)}
              </div>
            )}

            <label htmlFor={`skills[${index}].level`}>Level</label>
            <input
              type="text"
              id={`skills[${index}].level`}
              name={`skills[${index}].level`}
              onChange={formik.handleChange}
              value={item.level}
            />
            {getArrayFieldError(`skills[${index}].level`) && (
              <div className={styles.error}>
                {getArrayFieldError(`skills[${index}].level`)}
              </div>
            )}

            <button type="button" onClick={() => removeItem("skills", index)}>
              Remove Skill
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addItem("skills", EMPTY_SKILL)}>
          Add Skill
        </button>
      </div>

      <div className={styles.wrapper}>
        <h3>Projects</h3>
        {formik.values.projects.length === 0 && <p>No projects yet.</p>}
        {formik.values.projects.map((item, index) => (
          <div key={`project-${index}`}>
            <label htmlFor={`projects[${index}].name`}>Project Name</label>
            <input
              type="text"
              id={`projects[${index}].name`}
              name={`projects[${index}].name`}
              onChange={formik.handleChange}
              value={item.name}
            />
            {getArrayFieldError(`projects[${index}].name`) && (
              <div className={styles.error}>
                {getArrayFieldError(`projects[${index}].name`)}
              </div>
            )}

            <label htmlFor={`projects[${index}].description`}>
              Project Description
            </label>
            <textarea
              id={`projects[${index}].description`}
              name={`projects[${index}].description`}
              onChange={formik.handleChange}
              value={item.description}
            />
            {getArrayFieldError(`projects[${index}].description`) && (
              <div className={styles.error}>
                {getArrayFieldError(`projects[${index}].description`)}
              </div>
            )}

            <button type="button" onClick={() => removeItem("projects", index)}>
              Remove Project
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addItem("projects", EMPTY_PROJECT)}
        >
          Add Project
        </button>
      </div>

      <div className={styles.wrapper}>
        <h3>Languages</h3>
        {formik.values.languages.length === 0 && <p>No languages yet.</p>}
        {formik.values.languages.map((item, index) => (
          <div key={`language-${index}`}>
            <label htmlFor={`languages[${index}].name`}>Language</label>
            <input
              type="text"
              id={`languages[${index}].name`}
              name={`languages[${index}].name`}
              onChange={formik.handleChange}
              value={item.name}
            />
            {getArrayFieldError(`languages[${index}].name`) && (
              <div className={styles.error}>
                {getArrayFieldError(`languages[${index}].name`)}
              </div>
            )}

            <button
              type="button"
              onClick={() => removeItem("languages", index)}
            >
              Remove Language
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addItem("languages", EMPTY_LANGUAGE)}
        >
          Add Language
        </button>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
