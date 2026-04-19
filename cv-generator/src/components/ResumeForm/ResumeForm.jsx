import styles from "./ResumeForm.module.css";
import { useState } from "react";
import {useFormik, FieldArray} from "formik";
import validationSchema from "../../schemas/validationSchema";
export default function ResumeForm({ setCvData }) {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      summary: "",
      education: [ { institution: "", degree: "" ,startDate: "", endDate: "" } ],
      experience: [ { company: "", role: "" ,startDate: "", endDate: ""} ],
      skills: [ { name: "" ,level: ""} ],
      projects: [ { name: "", description: "" } ],
      languages: [ { name: "" } ],
    },
    onSubmit: (values) => {
       console.log("SUBMIT OLDU", values);
       console.log("ISLEDI");
       console.log(values);

      setCvData(values);
    },
    validationSchema,
  });
  return <>
  
  <form onSubmit={formik.handleSubmit}>
    <div className={styles.wrapper}>
      <div className={styles.row}>
      <div className={styles.formGroup}>
      <label htmlFor="fullName">Full Name</label>
      <input type="text" id="fullName" name="fullName" onChange={formik.handleChange} value={formik.values.fullName} />
      {formik.errors.fullName && <div className={styles.error}>{formik.errors.fullName}</div>}
    </div>
    <div className={styles.formGroup}>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
      {formik.errors.email && <div className={styles.error}>{formik.errors.email}</div>}
    </div>
    </div>
    <div className={styles.row}>
    <div className={styles.formGroup}>
      <label htmlFor="phone">Phone</label>
      <input type="text" id="phone" name="phone" onChange={formik.handleChange} value={formik.values.phone} />
      {formik.errors.phone && <div className={styles.error}>{formik.errors.phone}</div>}
    </div>
    <div className={styles.formGroup}>
      <label htmlFor="summary">Summary</label>
      <textarea id="summary" name="summary" onChange={formik.handleChange} value={formik.values.summary} />
      {formik.errors.summary && <div className={styles.error}>{formik.errors.summary}</div>}
    </div>
    </div>
    </div>

    <div className={styles.wrapper}>
      <h3>Education</h3>
      <label htmlFor="education[0].institution">Institution</label>
      <input type="text" id="education[0].institution" name="education[0].institution" onChange={formik.handleChange} value={formik.values.education[0].institution} />
      {formik.errors.education && formik.errors.education[0] && formik.errors.education[0].institution && <div className={styles.error}>{formik.errors.education[0].institution}</div>}
      <label htmlFor="education[0].degree">Degree</label>
      <input type="text" id="education[0].degree" name="education[0].degree" onChange={formik.handleChange} value={formik.values.education[0].degree} />
      {formik.errors.education && formik.errors.education[0] && formik.errors.education[0].degree && <div className={styles.error}>{formik.errors.education[0].degree}</div>}
      <label htmlFor="education[0].startDate">Start Date</label>
      <input type="date" id="education[0].startDate" name="education[0].startDate" onChange={formik.handleChange} value={formik.values.education[0].startDate} />
      {formik.errors.education && formik.errors.education[0] && formik.errors.education[0].startDate && <div className={styles.error}>{formik.errors.education[0].startDate}</div>}
      <label htmlFor="education[0].endDate">End Date</label>
      <input type="date" id="education[0].endDate" name="education[0].endDate" onChange={formik.handleChange} value={formik.values.education[0].endDate} />
      {formik.errors.education && formik.errors.education[0] && formik.errors.education[0].endDate && <div className={styles.error}>{formik.errors.education[0].endDate}</div>}


    </div>

    <div className={styles.wrapper}>
      <h3>Experience</h3>
      <label htmlFor="experience[0].company">Company</label>
      <input type="text" id="experience[0].company" name="experience[0].company" onChange={formik.handleChange} value={formik.values.experience[0]?.company || ""} />
      {formik.errors.experience && formik.errors.experience[0] && formik.errors.experience[0].company && <div className={styles.error}>{formik.errors.experience[0].company}</div>}
      <label htmlFor="experience[0].role">Role</label>
      <input type="text" id="experience[0].role" name="experience[0].role" onChange={formik.handleChange} value={formik.values.experience[0]?.role || ""} />
      {formik.errors.experience && formik.errors.experience[0] && formik.errors.experience[0].role && <div className={styles.error}>{formik.errors.experience[0].role}</div>}
      <label htmlFor="experience[0].startDate">Start Date</label>
      <input type="date" id="experience[0].startDate" name="experience[0].startDate" onChange={formik.handleChange} value={formik.values.experience[0]?.startDate || ""} />
      {formik.errors.experience && formik.errors.experience[0] && formik.errors.experience[0].startDate && <div className={styles.error}>{formik.errors.experience[0].startDate}</div>}
      <label htmlFor="experience[0].endDate">End Date</label>
      <input type="date" id="experience[0].endDate" name="experience[0].endDate" onChange={formik.handleChange} value={formik.values.experience[0]?.endDate || ""} />
      {formik.errors.experience && formik.errors.experience[0] && formik.errors.experience[0].endDate && <div className={styles.error}>{formik.errors.experience[0].endDate}</div>}
    </div>

    <div className={styles.wrapper}>
      <h3>Skills</h3>
      <label htmlFor="skills[0].name">Skill</label>
      <input type="text" id="skills[0].name" name="skills[0].name" onChange={formik.handleChange} value={formik.values.skills[0]?.name || ""} />
      {formik.errors.skills && formik.errors.skills[0] && formik.errors.skills[0].name && <div className={styles.error}>{formik.errors.skills[0].name}</div>}
      <label htmlFor="skills[0].level">Level</label>
      <input type="text" id="skills[0].level" name="skills[0].level" onChange={formik.handleChange} value={formik.values.skills[0]?.level || ""} />
      {formik.errors.skills && formik.errors.skills[0] && formik.errors.skills[0].level && <div className={styles.error}>{formik.errors.skills[0].level}</div>}
    </div>
    
    <div className={styles.wrapper}>
      <h3>Projects</h3>
      <label htmlFor="projects[0].name">Project Name</label>
      <input type="text" id="projects[0].name" name="projects[0].name" onChange={formik.handleChange} value={formik.values.projects[0]?.name || ""} />
      {formik.errors.projects && formik.errors.projects[0] && formik.errors.projects[0].name && <div className={styles.error}>{formik.errors.projects[0].name}</div>}
      <label htmlFor="projects[0].description">Project Description</label>
      <textarea id="projects[0].description" name="projects[0].description" onChange={formik.handleChange} value={formik.values.projects[0]?.description || ""} />
      {formik.errors.projects && formik.errors.projects[0] && formik.errors.projects[0].description && <div className={styles.error}>{formik.errors.projects[0].description}</div>}

    </div>

    <div className={styles.wrapper}>
      <h3>Languages</h3>
      <label htmlFor="languages[0].name">Language</label>
      <input type="text" id="languages[0].name" name="languages[0].name" onChange={formik.handleChange} value={formik.values.languages[0]?.name || ""} />
      {formik.errors.languages && formik.errors.languages[0] && formik.errors.languages[0].name && <div className={styles.error}>{formik.errors.languages[0].name}</div>}
    </div>

    <button type="submit">Submit</button>

  </form>
  </>;
}