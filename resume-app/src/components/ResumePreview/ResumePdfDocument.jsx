import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 36,
    paddingHorizontal: 34,
    fontSize: 10.5,
    color: "#1e293b",
    lineHeight: 1.5,
    fontFamily: "Helvetica",
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#1e3a5f",
    paddingBottom: 10,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#1e3a5f",
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    color: "#475569",
    fontSize: 9.5,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: 1.3,
    color: "#2563eb",
    fontFamily: "Helvetica-Bold",
    paddingBottom: 4,
    marginBottom: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#dbe4f0",
  },
  summary: {
    fontSize: 10.5,
    color: "#334155",
  },
  entry: {
    marginBottom: 9,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },
  entryTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  entryDate: {
    fontSize: 9,
    color: "#64748b",
  },
  entrySubtitle: {
    marginTop: 2,
    fontSize: 10,
    color: "#475569",
  },
  entryDescription: {
    marginTop: 4,
    fontSize: 10,
    color: "#334155",
  },
  twoColumn: {
    flexDirection: "row",
    gap: 14,
  },
  column: {
    flex: 1,
  },
  tagList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
    color: "#1e40af",
    fontSize: 9,
  },
  tagLevel: {
    color: "#3b82f6",
  },
});

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function hasText(value) {
  return String(value || "").trim() !== "";
}

export default function ResumePdfDocument({ cvData }) {
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
  } = cvData || {};

  const visibleEducation = education.filter(
    (item) => hasText(item?.institution) || hasText(item?.degree),
  );
  const visibleExperience = experience.filter(
    (item) => hasText(item?.company) || hasText(item?.role),
  );
  const visibleSkills = skills.filter((item) => hasText(item?.name));
  const visibleProjects = projects.filter((item) => hasText(item?.name));
  const visibleLanguages = languages.filter((item) => hasText(item?.name));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{fullName || "Your Name"}</Text>
          <View style={styles.contactRow}>
            {email ? <Text>{email}</Text> : null}
            {phone ? <Text>{phone}</Text> : null}
          </View>
        </View>

        {hasText(summary) ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.summary}>{summary}</Text>
          </View>
        ) : null}

        {visibleExperience.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {visibleExperience.map((item, index) => (
              <View key={`experience-${index}`} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{item.role}</Text>
                  <Text style={styles.entryDate}>
                    {formatDate(item.startDate)}
                    {item.startDate ? " - " : ""}
                    {formatDate(item.endDate) ||
                      (item.startDate ? "Present" : "")}
                  </Text>
                </View>
                <Text style={styles.entrySubtitle}>{item.company}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {visibleEducation.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {visibleEducation.map((item, index) => (
              <View key={`education-${index}`} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{item.degree}</Text>
                  <Text style={styles.entryDate}>
                    {formatDate(item.startDate)}
                    {item.startDate ? " - " : ""}
                    {formatDate(item.endDate) ||
                      (item.startDate ? "Present" : "")}
                  </Text>
                </View>
                <Text style={styles.entrySubtitle}>{item.institution}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {visibleSkills.length || visibleLanguages.length ? (
          <View style={styles.twoColumn}>
            {visibleSkills.length ? (
              <View style={styles.column}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Skills</Text>
                  <View style={styles.tagList}>
                    {visibleSkills.map((item, index) => (
                      <Text key={`skill-${index}`} style={styles.tag}>
                        {item.name}
                        {item.level ? (
                          <Text style={styles.tagLevel}> · {item.level}</Text>
                        ) : null}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            ) : null}

            {visibleLanguages.length ? (
              <View style={styles.column}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Languages</Text>
                  <View style={styles.tagList}>
                    {visibleLanguages.map((item, index) => (
                      <Text key={`language-${index}`} style={styles.tag}>
                        {item.name}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        ) : null}

        {visibleProjects.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {visibleProjects.map((item, index) => (
              <View key={`project-${index}`} style={styles.entry}>
                <Text style={styles.entryTitle}>{item.name}</Text>
                {hasText(item.description) ? (
                  <Text style={styles.entryDescription}>
                    {item.description}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
