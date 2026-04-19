import styles from "./ResumePreview.module.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePdfDocument from "./ResumePdfDocument.jsx";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function ResumePreview({ cvData }) {
  const hasAnyContent =
    cvData &&
    Object.values(cvData).some((value) => {
      if (Array.isArray(value)) {
        return value.some((item) =>
          Object.values(item || {}).some((v) => String(v || "").trim() !== ""),
        );
      }
      return String(value || "").trim() !== "";
    });

  if (!hasAnyContent) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>📄</span>
        <p>Fill in the form to see your resume preview</p>
      </div>
    );
  }

  const {
    fullName,
    email,
    phone,
    summary,
    education = [],
    experience = [],
    skills = [],
    projects = [],
    languages = [],
  } = cvData;

  return (
    <div className={styles.previewPanel}>
      <div className={styles.toolbar}>
        <PDFDownloadLink
          document={<ResumePdfDocument cvData={cvData} />}
          fileName={`${(fullName || "resume").trim().replace(/\s+/g, "-").toLowerCase()}.pdf`}
          className={styles.downloadButton}
        >
          {({ loading }) => (loading ? "Preparing PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </div>

      <div className={styles.resume}>
        {/* ── Header ── */}
        <header className={styles.header}>
          <h1 className={styles.name}>{fullName || "Your Name"}</h1>
          <div className={styles.contact}>
            {email && <span>{email}</span>}
            {phone && <span>{phone}</span>}
          </div>
        </header>

        {/* ── Summary ── */}
        {summary && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Profile</h2>
            <p className={styles.summary}>{summary}</p>
          </section>
        )}

        {/* ── Experience ── */}
        {experience.some((e) => e.company || e.role) && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            {experience.map(
              (exp, i) =>
                (exp.company || exp.role) && (
                  <div key={i} className={styles.entry}>
                    <div className={styles.entryHeader}>
                      <span className={styles.entryTitle}>{exp.role}</span>
                      <span className={styles.entryDate}>
                        {formatDate(exp.startDate)}
                        {exp.startDate && " – "}
                        {formatDate(exp.endDate) ||
                          (exp.startDate ? "Present" : "")}
                      </span>
                    </div>
                    <span className={styles.entrySubtitle}>{exp.company}</span>
                  </div>
                ),
            )}
          </section>
        )}

        {/* ── Education ── */}
        {education.some((e) => e.institution || e.degree) && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Education</h2>
            {education.map(
              (edu, i) =>
                (edu.institution || edu.degree) && (
                  <div key={i} className={styles.entry}>
                    <div className={styles.entryHeader}>
                      <span className={styles.entryTitle}>{edu.degree}</span>
                      <span className={styles.entryDate}>
                        {formatDate(edu.startDate)}
                        {edu.startDate && " – "}
                        {formatDate(edu.endDate) ||
                          (edu.startDate ? "Present" : "")}
                      </span>
                    </div>
                    <span className={styles.entrySubtitle}>
                      {edu.institution}
                    </span>
                  </div>
                ),
            )}
          </section>
        )}

        {/* ── Skills + Languages side by side ── */}
        <div className={styles.twoCol}>
          {skills.some((s) => s.name) && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Skills</h2>
              <ul className={styles.tagList}>
                {skills.map(
                  (s, i) =>
                    s.name && (
                      <li key={i} className={styles.tag}>
                        {s.name}
                        {s.level && (
                          <span className={styles.tagLevel}> · {s.level}</span>
                        )}
                      </li>
                    ),
                )}
              </ul>
            </section>
          )}

          {languages.some((l) => l.name) && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Languages</h2>
              <ul className={styles.tagList}>
                {languages.map(
                  (l, i) =>
                    l.name && (
                      <li key={i} className={styles.tag}>
                        {l.name}
                      </li>
                    ),
                )}
              </ul>
            </section>
          )}
        </div>

        {/* ── Projects ── */}
        {projects.some((p) => p.name) && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Projects</h2>
            {projects.map(
              (proj, i) =>
                proj.name && (
                  <div key={i} className={styles.entry}>
                    <div className={styles.entryHeader}>
                      <span className={styles.entryTitle}>{proj.name}</span>
                    </div>
                    {proj.description && (
                      <p className={styles.entryDesc}>{proj.description}</p>
                    )}
                  </div>
                ),
            )}
          </section>
        )}
      </div>
    </div>
  );
}
