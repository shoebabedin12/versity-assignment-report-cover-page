"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import logo from "@/app/assets/images/logo.jpeg";

const defaultData = {
  university: "Central University of Science & Technology",
  labTitle: "LAB REPORT",
  department: "Department of Computer Science and Engineering",
  courseTitle: "Computer Graphics Lab",
  courseCode: "CSE 408",
  name: "MD Shoeb Abedin",
  id: "08923100051010",
  semester: "Fall 2025",
  program: "B.Sc in CSE",
  submittedTo: "MD Hasan Al Mamun",
  designation:
    "Lecturer, Department of CSE, Central University of Science & Technology.",
  submissionDate: "",
};

// Lazy state initialization to read localStorage only on the client
export default function Home() {
  const previewRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("labReportData");
      return saved ? JSON.parse(saved) : defaultData;
    }
    return defaultData; // fallback for SSR
  });

  const handlePrint = () => {
    if (!previewRef.current) return;

    const printContents = previewRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

    window.location.reload(); // UI restore
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updated = { ...data, [e.target.name]: e.target.value };
    setData(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("labReportData", JSON.stringify(updated));
    }
  };

  return (
    <div className="builder-container">
      {/* LEFT FORM */}
      <div className="form-section">
        <h2 className="form-title">Lab Report Editor</h2>

        <div className="form-grid">
          <FormInput label="University Name" name="university" value={data.university} onChange={handleChange} />
          <FormInput label="Lab Title" name="labTitle" value={data.labTitle} onChange={handleChange} />
          <FormInput label="Department" name="department" value={data.department} onChange={handleChange} />
          <FormInput label="Course Title" name="courseTitle" value={data.courseTitle} onChange={handleChange} />
          <FormInput label="Course Code" name="courseCode" value={data.courseCode} onChange={handleChange} />
          <FormInput label="Student Name" name="name" value={data.name} onChange={handleChange} />
          <FormInput label="Student ID" name="id" value={data.id} onChange={handleChange} />
          <FormInput label="Semester" name="semester" value={data.semester} onChange={handleChange} />
          <FormInput label="Program" name="program" value={data.program} onChange={handleChange} />
          <FormInput label="Submitted To" name="submittedTo" value={data.submittedTo} onChange={handleChange} />
          <FormInput label="Designation" name="designation" value={data.designation} onChange={handleChange} textarea />
          <FormInput label="Submission Date" name="submissionDate" value={data.submissionDate} onChange={handleChange} />
        </div>

        <button className="print-btn" onClick={handlePrint}>
          Print / Save PDF
        </button>
      </div>

      {/* RIGHT PREVIEW */}
      <div className="preview-section">
        <div ref={previewRef} className="a4-page">
          <h1 className="university">{data.university}</h1>

          <div className="logo-box">
            <Image src={logo} alt="University Logo" width={140} height={140} />
          </div>

          <h2 className="lab-title">{data.labTitle}</h2>
          <hr className="divider" />
          <p className="department">{data.department}</p>

          <div className="course-info">
            <p><strong>Course Title:</strong> {data.courseTitle}</p>
            <p><strong>Course Code:</strong> {data.courseCode}</p>
          </div>

          <div className="submission-table">
            <div className="left">
              <h3>Submitted by</h3>
              <p><strong>Name:</strong> {data.name}</p>
              <p><strong>ID No:</strong> {data.id}</p>
              <p><strong>Semester:</strong> {data.semester}</p>
              <p><strong>Program:</strong> {data.program}</p>
            </div>

            <div className="right">
              <h3>Submitted to</h3>
              <p><strong>{data.submittedTo}</strong></p>
              <p>{data.designation}</p>
            </div>
          </div>

          <div className="submission-date">
            <strong>Submission Date:</strong> {data.submissionDate}
          </div>
        </div>
      </div>
    </div>
  );
}

function FormInput({
  label,
  name,
  value,
  onChange,
  textarea = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  textarea?: boolean;
}) {
  return (
    <div className="form-group">
      <label>{label}</label>
      {textarea ? (
        <textarea name={name} value={value} onChange={onChange} />
      ) : (
        <input type="text" name={name} value={value} onChange={onChange} />
      )}
    </div>
  );
}