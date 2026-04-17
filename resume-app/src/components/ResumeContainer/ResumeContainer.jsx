import styles from "./ResumeContainer.module.css";


export default function ResumeContainer({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}