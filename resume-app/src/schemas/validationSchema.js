import * as Yup from "yup";

const hasText = (value) => Boolean(value && value.trim());

const educationItemSchema = Yup.object({
  institution: Yup.string(),
  degree: Yup.string(),
  startDate: Yup.string(),
  endDate: Yup.string(),
}).test(
  "education-pair",
  "Institution and degree are required when education details are entered",
  (value) => {
    if (!value) return true;

    const hasAnyEducationValue = [
      value.institution,
      value.degree,
      value.startDate,
      value.endDate,
    ].some(hasText);

    if (!hasAnyEducationValue) return true;

    return hasText(value.institution) && hasText(value.degree);
  },
);

const experienceItemSchema = Yup.object({
  company: Yup.string(),
  role: Yup.string(),
  startDate: Yup.string(),
  endDate: Yup.string(),
}).test(
  "experience-pair",
  "Company and role are required when experience details are entered",
  (value) => {
    if (!value) return true;

    const hasAnyExperienceValue = [
      value.company,
      value.role,
      value.startDate,
      value.endDate,
    ].some(hasText);

    if (!hasAnyExperienceValue) return true;

    return hasText(value.company) && hasText(value.role);
  },
);

const skillItemSchema = Yup.object({
  name: Yup.string(),
  level: Yup.string(),
}).test("skill-pair", "Skill and level must both be filled", (value) => {
  if (!value) return true;

  const hasAnySkillValue = [value.name, value.level].some(hasText);

  if (!hasAnySkillValue) return true;

  return hasText(value.name) && hasText(value.level);
});

const projectItemSchema = Yup.object({
  name: Yup.string(),
  description: Yup.string(),
}).test(
  "project-pair",
  "Project name and description must both be filled",
  (value) => {
    if (!value) return true;

    const hasAnyProjectValue = [value.name, value.description].some(hasText);

    if (!hasAnyProjectValue) return true;

    return hasText(value.name) && hasText(value.description);
  },
);

const validationSchema = Yup.object({
  fullName: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  summary: Yup.string().required("Summary is required"),
  education: Yup.array().of(educationItemSchema),
  experience: Yup.array().of(experienceItemSchema),
  skills: Yup.array().of(skillItemSchema),
  projects: Yup.array().of(projectItemSchema),
  languages: Yup.array().of(
    Yup.object({
      name: Yup.string(),
    }),
  ),
});

export default validationSchema;
