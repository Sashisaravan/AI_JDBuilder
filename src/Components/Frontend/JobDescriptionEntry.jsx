import { useState, useRef } from "react";
import axios from "axios";
import {
    Button,
    Card,
    CardContent,
    Grid,
    Paper,
    TextField,
    Typography,
    Divider,
} from "@mui/material";
import {
    FiBriefcase,
    FiCode,
    FiClock,
    FiDownload,
    FiFileText,
    FiMapPin,
    FiDollarSign,
    FiHome,
    FiUsers,
    FiAward,
    FiCheckCircle,
    FiZap,
    FiClipboard,
    FiEdit3,
    FiSearch,
    FiSettings,
    FiLayers,
    FiBookOpen,
    FiStar,
    FiTarget,
    FiShield,
    FiTrendingUp,
    FiPlus,
    FiCopy,
    FiEye,
    FiUser,
    FiCalendar,
    FiGlobe,
    FiInfo,
    FiChevronRight,
    FiCheck,
    FiSend
} from "react-icons/fi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";
import { JDBuilderStyles } from "../../assets/MuiStyles/JDBuilderStyle";

export default function JobDescriptionEntry() {
    const jdClasses = JDBuilderStyles()

    const [title, setTitle] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [activeTab, setActiveTab] = useState(0);
    const [prompt, setPrompt] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedJD, setEditedJD] = useState("");
    const [errors, setErrors] = useState({});
    const [jd, setJd] = useState("");
    const [companyLogo, setCompanyLogo] = useState(null);
    const [loading, setLoading] = useState(false);

    const jdRef = useRef();

    const validateForm = () => {
        let newErrors = {};

        if (activeTab === 0) {
            if (!prompt.trim()) {
                newErrors.prompt = "Job description prompt is required";
            }
        } else {
            if (!title.trim()) newErrors.title = "Job title is required";
            if (!skills.trim()) newErrors.skills = "Skills are required";
            if (!experience.trim()) newErrors.experience = "Experience is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            setCompanyLogo(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const generateJD = async () => {
        if (!validateForm()) return;
        try {
            setLoading(true);

            const payload =
                activeTab === 0
                    ? { prompt }
                    : {
                        title,
                        skills,
                        experience,
                    };

            const res = await axios.post(
                "http://localhost:5000/generate-jd",
                payload
            );

            setJd(res.data.jd);
            setEditedJD(res.data.jd);
            setIsEditing(false);
        } catch (err) {
            alert("Failed to generate JD");
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = async () => {
        const canvas = await html2canvas(jdRef.current);

        const img = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        const width = 190;

        const height = (canvas.height * width) / canvas.width;

        pdf.addImage(img, "PNG", 10, 10, width, height);

        pdf.save("JobDescription.pdf");
    };

    const downloadWord = async () => {
        const doc = new Document({
            sections: [
                {
                    children: [new Paragraph(jd)],
                },
            ],
        });

        const blob = await Packer.toBlob(doc);

        saveAs(blob, "JobDescription.docx");
    };

    const parseJD = (text) => {
        if (!text) return [];

        const clean = text.replace(/\*\*/g, "");
        const lines = clean.split("\n");

        const sections = [];
        let current = null;

        lines.map((line) => {
            const trimmed = line.trim();

            if (trimmed.endsWith(":")) {
                if (current) {
                    sections.push(current);
                }

                current = {
                    title: trimmed.slice(0, -1),
                    content: "",
                };
            } else if (current) {
                current.content += trimmed + "\n";
            }

            return null;
        });

        if (current) {
            sections.push(current);
        }

        return sections;
    };

    const extractSection = (text, sectionName) => {
        const regex = new RegExp(`${sectionName}[:\\n]*([\\s\\S]*?)(?=\\n\\d+\\.|$)`, "i");
        const match = text.match(regex);
        return match ? match[1].trim() : "";
    };

    const Section = ({ title, content }) => {
        if (!content || typeof content !== "string") return null;

        return (
            <div style={{ marginBottom: 16 }}>
                <h3 style={{ marginBottom: 6 }}>{title}</h3>
                <p style={{ whiteSpace: "pre-line" }}>
                    {content}
                </p>
            </div>
        );
    };
    const structuredJD = jd ? parseJD(jd) : {};

    const sections = parseJD(jd);

    return (
        <div>
            <div className={jdClasses.topBar}>
                <div className={jdClasses.topBarLeft}>
                    <span className={jdClasses.logo}>
                        <FiZap size={18} /> JD Builder AI
                    </span>
                </div>
            </div>
            <div className={jdClasses.page}>

                <div className={jdClasses.container}>
                    <div className={jdClasses.leftPanel}>
                        <div className={jdClasses.card}>
                            <div className={jdClasses.subHeading}>
                                Start New Generation
                            </div>

                            <div className={jdClasses.subText}>
                                Select key parameters or specify candidate requirements dynamically below.
                            </div>


                            <div className={jdClasses.tabContainer}>

                                <div
                                    className={activeTab === 0
                                        ? jdClasses.activeTab
                                        : jdClasses.inactiveTab}
                                    onClick={() => setActiveTab(0)}
                                >
                                    <FiZap className={jdClasses.icon} /> Quick AI Prompt
                                </div>

                                <div
                                    className={activeTab === 1
                                        ? jdClasses.activeTab
                                        : jdClasses.inactiveTab}
                                    onClick={() => setActiveTab(1)}
                                >
                                    <FiClipboard className={jdClasses.icon} />   Form Checklist
                                </div>
                            </div>
                            {activeTab === 0 && (
                                <>
                                    <div className={jdClasses.formGroup}>

                                        <label className={jdClasses.label}>
                                            Describe the Position
                                        </label>

                                        <div className={jdClasses.inputWrapper}>
                                            <textarea
                                                rows={10}
                                                className={jdClasses.textarea}
                                                placeholder="Describe the position in detail..."
                                                value={prompt}
                                                onChange={(e) => setPrompt(e.target.value)}
                                            />
                                        </div>
                                        {errors.prompt && (
                                            <div style={{ color: "red", fontSize: 12, marginTop: 5 }}>
                                                {errors.prompt}
                                            </div>
                                        )}
                                    </div>

                                </>
                            )}
                            {activeTab === 1 && (
                                <>
                                    <div className={jdClasses.formGroup}>
                                        <label className={jdClasses.label}>
                                            Job Title
                                        </label>
                                        <div className={jdClasses.inputWrapper}>
                                            <FiBriefcase className={jdClasses.icon} />
                                            <input
                                                className={jdClasses.input}
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Senior React Developer"
                                            />
                                        </div>
                                        {errors.title && (
                                            <div style={{ color: "red", fontSize: 12, marginTop: 5 }}>
                                                {errors.title}
                                            </div>
                                        )}
                                    </div>
                                    <div className={jdClasses.formGroup}>

                                        <label className={jdClasses.label}>
                                            Skills Required
                                        </label>
                                        <div className={jdClasses.inputWrapper}>
                                            <FiCode className={jdClasses.icon} />

                                            <textarea
                                                rows={4}
                                                className={jdClasses.textarea}
                                                value={skills}
                                                onChange={(e) => setSkills(e.target.value)}
                                                placeholder="React, JavaScript, TypeScript, HTML, CSS..."
                                            />
                                        </div>
                                        {errors.skills && (
                                            <div style={{ color: "red", fontSize: 12, marginTop: 5 }}>
                                                {errors.skills}
                                            </div>
                                        )}
                                    </div>
                                    <div className={jdClasses.formGroup}>

                                        <label className={jdClasses.label}>
                                            Experience
                                        </label>

                                        <div className={jdClasses.inputWrapper}>

                                            <FiClock className={jdClasses.icon} />

                                            <input
                                                className={jdClasses.input}
                                                value={experience}
                                                onChange={(e) => setExperience(e.target.value)}
                                                placeholder="3+ Years"
                                            />

                                        </div>
                                        {errors.experience && (
                                            <div style={{ color: "red", fontSize: 12, marginTop: 5 }}>
                                                {errors.experience}
                                            </div>
                                        )}
                                    </div>
                                    <div className={jdClasses.formGroup}>

                                        <label className={jdClasses.label}>
                                            Location
                                        </label>

                                        <div className={jdClasses.inputWrapper}>

                                            <FiMapPin className={jdClasses.icon} />

                                            <input
                                                className={jdClasses.input}
                                                placeholder="Chennai / Bangalore / Remote"
                                            />

                                        </div>

                                    </div>


                                    <div className={jdClasses.formGroup}>

                                        <label className={jdClasses.label}>
                                            Employment Type
                                        </label>

                                        <div className={jdClasses.inputWrapper}>

                                            <FiBriefcase className={jdClasses.icon} />

                                            <input
                                                className={jdClasses.input}
                                                placeholder="Full Time"
                                            />

                                        </div>

                                    </div>

                                    <div className={jdClasses.formGroup}>

                                        <label className={jdClasses.label}>
                                            Salary Range
                                        </label>

                                        <div className={jdClasses.inputWrapper}>

                                            <FiDollarSign className={jdClasses.icon} />

                                            <input
                                                className={jdClasses.input}
                                                placeholder="₹8 LPA - ₹15 LPA"
                                            />
                                        </div>
                                    </div>
                                    <div className={jdClasses.formGroup}>

                                        <label className={jdClasses.label}>
                                            Responsibilities
                                        </label>

                                        <div className={jdClasses.inputWrapper}>

                                            <textarea
                                                rows={5}
                                                className={jdClasses.textarea}
                                                placeholder="Mention the key responsibilities..."
                                            />
                                        </div>
                                    </div>
                                    <div className={jdClasses.formGroup}>

                                        <label className={jdClasses.label}>
                                            Benefits
                                        </label>

                                        <div className={jdClasses.inputWrapper}>

                                            <textarea
                                                rows={4}
                                                className={jdClasses.textarea}
                                                placeholder="Health Insurance, Bonus, Flexible Timing..."
                                            />

                                        </div>

                                    </div>

                                </>
                            )}
                            <button
                                className={jdClasses.generateBtn}
                                onClick={generateJD}
                            >
                                {loading ? (
                                    "Generating..."
                                ) : (
                                    <>
                                        <FiZap size={18} style={{ marginRight: 8 }} />
                                        Generate Job Description
                                    </>
                                )}
                            </button>

                        </div>
                    </div>
                    <div className={jdClasses.rightPanel}>
                        <div className={jdClasses.preview}>
                            <div className={jdClasses.toolbar}>

                                <div className={jdClasses.previewTitle}>
                                    <FiFileText />
                                    Job Description Preview
                                </div>

                                {jd && (
                                    <div className={jdClasses.downloadGroup}>
                                        <button
                                            className={jdClasses.downloadBtn}
                                            onClick={() => setIsEditing(!isEditing)}
                                        >
                                            {isEditing ? "Cancel" : "Edit"}
                                        </button>

                                        {isEditing && (
                                            <button
                                                className={jdClasses.downloadBtn}
                                                onClick={() => {
                                                    setJd(editedJD);
                                                    setIsEditing(false);
                                                }}
                                            >
                                                Save
                                            </button>
                                        )}

                                        <button
                                            className={jdClasses.downloadBtn}
                                            onClick={downloadPDF}
                                        >
                                            <FiDownload />
                                            PDF
                                        </button>

                                        <button
                                            className={jdClasses.downloadBtn}
                                            onClick={downloadWord}
                                        >
                                            <FiDownload />
                                            Word
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div ref={jdRef} className={jdClasses.jdBox}>
                                {loading ? (
                                    <div className={jdClasses.loadingContainer}>
                                        <div className={jdClasses.aiHeader}>
                                            <div className={jdClasses.aiSpinner}></div>

                                            <div>
                                                <Typography className={jdClasses.loadingTitle}>
                                                    AI is crafting your Job Description...
                                                </Typography>

                                                <Typography className={jdClasses.loadingSub}>
                                                    Optimizing for ATS • Skills • Responsibilities • Benefits
                                                </Typography>
                                            </div>
                                        </div>

                                        <div className={jdClasses.loadingCard}>
                                            <div className={`${jdClasses.skeleton} ${jdClasses.title}`}></div>

                                            <div className={`${jdClasses.skeleton} ${jdClasses.line}`}></div>
                                            <div className={`${jdClasses.skeleton} ${jdClasses.line}`}></div>
                                            <div className={`${jdClasses.skeleton} ${jdClasses.short}`}></div>

                                            <div className={`${jdClasses.skeleton} ${jdClasses.heading}`}></div>

                                            <div className={`${jdClasses.skeleton} ${jdClasses.line}`}></div>
                                            <div className={`${jdClasses.skeleton} ${jdClasses.line}`}></div>
                                            <div className={`${jdClasses.skeleton} ${jdClasses.line}`}></div>

                                            <div className={`${jdClasses.skeleton} ${jdClasses.heading}`}></div>

                                            <div className={`${jdClasses.skeleton} ${jdClasses.line}`}></div>
                                            <div className={`${jdClasses.skeleton} ${jdClasses.short}`}></div>

                                            <div className={`${jdClasses.skeleton} ${jdClasses.heading}`}></div>

                                            <div className={`${jdClasses.skeleton} ${jdClasses.line}`}></div>
                                            <div className={`${jdClasses.skeleton} ${jdClasses.line}`}></div>
                                        </div>
                                    </div>
                                ) : !jd ? (

                                    <div className={jdClasses.emptyState}>
                                        <div className={jdClasses.emptyIconWrapper}>
                                            <FiZap className={jdClasses.emptyIcon} />
                                        </div>

                                        <Typography className={jdClasses.emptyTitle}>
                                            Start Building Your Job Description
                                        </Typography>

                                        <Typography className={jdClasses.emptyText}>
                                            Choose a preset template or fill in the job details on the left.
                                            <br /><br />
                                            Then click <strong>Generate Job Description</strong> to let AI create a
                                            professional ATS-friendly Job Description.
                                        </Typography>
                                    </div>

                                ) : isEditing ? (

                                    <div className={jdClasses.editorWrapper}>
                                        <div className={jdClasses.editorHeader}>

                                            <Typography className={jdClasses.editorTitle}>
                                                Edit Job Description
                                            </Typography>

                                        </div>
                                        {companyLogo && (
                                            <div className={jdClasses.logoPreview}>
                                                <img
                                                    src={companyLogo}
                                                    alt="Company Logo"
                                                    className={jdClasses.companyLogoLarge}
                                                />
                                            </div>
                                        )}

                                        <div className={jdClasses.quillWrapper}>
                                            <textarea
                                                value={editedJD}
                                                onChange={(e) => setEditedJD(e.target.value)}
                                                className={jdClasses.editorTextarea}
                                            />
                                        </div>

                                    </div>

                                ) : (

                                    <div className={jdClasses.jdContent}>
                                        {companyLogo && (
                                            <img
                                                src={companyLogo}
                                                alt="Company Logo"
                                                className={jdClasses.previewLogo}
                                            />
                                        )}
                                        {sections && sections.map((section, index) => (
                                            <Section
                                                key={index}
                                                title={section.title}
                                                content={section.content}
                                            />
                                        ))}

                                    </div>

                                )}

                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div >
    );
}