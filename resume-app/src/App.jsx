import React from "react";
import ResumeContainer from "./components/ResumeContainer";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import { useState } from "react";
export default function App() {

const [cvData, setCvData] = useState({});
  return (

    <div>
      <h1>Resume App</h1>

      <ResumeContainer>
        <ResumeForm setCvData={setCvData} />
        <ResumePreview cvData={cvData} />
      </ResumeContainer>
    </div>
  );
}
