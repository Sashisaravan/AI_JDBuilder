import { makeStyles } from "@mui/styles";

export const JDBuilderStyles = makeStyles({
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "35px",
    fontFamily: "'Inter', sans-serif",
    marginTop: '4%'
  },

  heading: {
    fontSize: 34,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 30,
  },

  container: {
    display: "flex",
    gap: 25,
    alignItems: "flex-start",

    "@media (max-width:1000px)": {
      flexDirection: "column",
    },
  },

  /* LEFT PANEL */

  leftPanel: {
    width: "42%",

    "@media (max-width:1000px)": {
      width: "100%",
    },
  },

  card: {
    background: "#fff",
    borderRadius: 22,
    padding: 28,
    boxShadow: "0 12px 35px rgba(15,23,42,.08)",
    border: "1px solid #edf2f7",
  },

  subHeading: {
    fontSize: 16,
    fontWeight: 700,
    color: "#125af3",
    marginBottom: 6,
  },

  subText: {
    color: "#64748b",
    fontSize: 12,
    marginBottom: 25,
  },

  /* TEMPLATE */

  templateTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#94a3b8",
    letterSpacing: 1.5,
    marginBottom: 15,
    textTransform: "uppercase",
  },

  templateWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 25,
  },

  templateChip: {
    padding: "11px 18px",
    borderRadius: 12,
    border: "1px solid #dbe4ef",
    cursor: "pointer",
    background: "#fff",
    fontWeight: 600,
    transition: ".25s",

    "&:hover": {
      background: "#2563eb",
      color: "#fff",
      borderColor: "#2563eb",
      transform: "translateY(-2px)",
    },
  },

  /* TABS */
  tabContainer: {
    display: "flex",
    background: "#f1f5f9",
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },

  activeTab: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    background: "#fff",
    borderRadius: 8,
    padding: "10px 14px",   // Reduced from 14px
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 3px 10px rgba(0,0,0,.08)",
    transition: ".3s",
  },

  inactiveTab: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "10px 14px",   // Reduced from 14px
    fontSize: 14,
    cursor: "pointer",
    color: "#64748b",
    fontWeight: 600,
    transition: ".3s",

    "&:hover": {
      color: "#2563eb",
    },
  },

  /* FORM */

  formGroup: {
    marginBottom: 22,
  },

  label: {
    display: "block",
    marginBottom: 8,
    fontWeight: 700,
    color: "#1e293b",
    fontSize: '14px'
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #7a828b",
    borderRadius: 14,
    background: "#fff",
    padding: "0px 15px",
    transition: ".3s",

    "&:focus-within": {
      borderColor: "#2563eb",
      boxShadow: "0 0 0 4px rgba(37,99,235,.12)",
    },
  },

  icon: {
    color: "#2563eb",
    fontSize: 20,
    marginRight: 10,
  },

  input: {
    width: "100%",
    height: 55,
    border: "none",
    outline: "none",
    fontSize: 15,
    background: "transparent",
  },

  textarea: {
    width: "100%",
    border: "none",
    outline: "none",
    resize: "vertical",
    minHeight: 180,
    fontSize: 15,
    padding: "15px 0",
    fontFamily: "inherit",
    background: "transparent",
    lineHeight: 1.7,
  },

  /* AI SUGGESTIONS */

  suggestionWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 15,
    marginBottom: 25,
  },

  suggestionChip: {
    background: "#eff6ff",
    color: "#2563eb",
    padding: "8px 14px",
    borderRadius: 30,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",

    "&:hover": {
      background: "#2563eb",
      color: "#fff",
    },
  },


  generateBtn: {
    width: "100%",
    height: 58,
    border: "none",
    borderRadius: 14,
    cursor: "pointer",
    fontSize: 17,
    fontWeight: 700,
    color: "#fff",
    background: "#310064",
    transition: ".3s",

    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 15px 30px rgba(37,99,235,.35)",
    },
  },

  /* RIGHT */

  rightPanel: {
    width: "58%",

    "@media (max-width:1000px)": {
      width: "100%",
    },
  },

  preview: {
    background: "#fff",
    borderRadius: 22,
    overflow: "hidden",
    boxShadow: "0 12px 35px rgba(15,23,42,.08)",
    border: "1px solid #edf2f7",
  },

  toolbar: {
    padding: "18px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #eef2f7",
    background: "#fff",
  },

  previewTitle: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontWeight: 700,
    fontSize: 16,
    color: "#1e293b",
  },

  downloadGroup: {
    display: "flex",
    gap: 10,
  },

  downloadBtn: {
    border: "1px solid #dbe4ef",
    background: "#fff",
    color: "#334155",
    borderRadius: 10,
    padding: "10px 16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 600,
    transition: ".3s",

    "&:hover": {
      background: "#2563eb",
      color: "#fff",
      borderColor: "#2563eb",
    },
  },


  jdBox: {
    padding: '20px 40px',
    background: "#fafafa",
    minHeight: 800,
    overflowY: "auto",
  },

  liveDraft: {
    display: "inline-block",
    background: "#eef2ff",
    color: "#4f46e5",
    fontWeight: 700,
    letterSpacing: 2,
    fontSize: 12,
    padding: "6px 12px",
    borderRadius: 20,
    marginBottom: 20,
  },

  jdTitle: {
    fontSize: 38,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 15,
  },

  jdDescription: {
    color: "#64748b",
    lineHeight: 1.8,
    fontSize: 16,
    marginBottom: 30,
  },

  divider: {
    borderTop: "1px solid #e5e7eb",
    margin: "30px 0",
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 18,
  },

  bullet: {
    marginBottom: 10,
    color: "#475569",
    lineHeight: 1.8,
    paddingLeft: 18,
  },

  placeholder: {
    color: "#94a3b8",
    whiteSpace: "pre-wrap",
    fontSize: 15,
    lineHeight: 1.8,
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "50px 30px",
  },

  emptyIconWrapper: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#EEF2FF,#E0E7FF)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    boxShadow: "0 10px 30px rgba(37,99,235,.12)",
  },

  emptyIcon: {
    fontSize: 40,
    color: "#4F46E5",
  },

  emptyTitle: {
    fontSize: 32,
    fontWeight: 700,
    color: "#0F172A",
    marginBottom: 18,
  },

  emptyText: {
    maxWidth: 520,
    color: "#64748B",
    fontSize: 17,
    lineHeight: 1.8,
  },
  topBar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: 64,
    background: "#310064",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 25px",
    zIndex: 1000,
    boxShadow: "0 6px 20px rgba(0,0,0,.15)",
  },

  topBarLeft: {
    display: "flex",
    alignItems: "center",
    fontFamily: 'sans-serif'
  },

  logo: {
    color: "#fff",
    fontSize: 19,
    fontWeight: 600,
  },

  topBarRight: {
    display: "flex",
    gap: 10,
  },

  topBarBtn: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,.2)",
    color: "#e2e8f0",
    padding: "8px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 13,
    transition: ".3s",

    "&:hover": {
      background: "rgba(255,255,255,.1)",
    },
  },

  topBarBtnPrimary: {
    background: "#2563eb",
    border: "none",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 13,

    "&:hover": {
      background: "#1d4ed8",
    },
  },
  editorWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },

  editorHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  editorTitle: {
    fontSize: 22,
    fontWeight: 700,
  },

  logoUpload: {
    display: "flex",
    alignItems: "center",
    padding: "10px 18px",
    border: "1px dashed #5B5FC7",
    borderRadius: 8,
    cursor: "pointer",
    color: "#5B5FC7",
    fontWeight: 600,
  },

  logoPreview: {
    marginBottom: 20,
  },

  companyLogo: {
    width: 42,
    height: 42,
    borderRadius: 6,
    objectFit: "contain",
  },

  companyLogoLarge: {
    width: 90,
    height: 90,
    objectFit: "contain",
    borderRadius: 10,
    border: "1px solid #ddd",
    padding: 6,
  },

  previewLogo: {
    width: 70,
    marginBottom: 20,
  },

  quillWrapper: {
    flex: 1,
  },

  quillEditor: {
    height: "65vh",
  },
  editorTextarea: {
    width: "100%",
    height: "75vh",
    padding: 24,
    fontSize: "16px",
    lineHeight: 1.8,
    border: "1px solid #d1d5db",
    borderRadius: 12,
    resize: "none",
    outline: "none",
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#fff",
  },
  loadingContainer: {
    padding: 40,
    display: "flex",
    flexDirection: "column",
    gap: 30,
    height: "100%",
    background: "#fafafa",
  },
  aiHeader: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  aiSpinner: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    border: "5px solid #e3f2fd",
    borderTop: "5px solid #1976d2",
    animation: "$spin 1s linear infinite",
  },
  loadingTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#1f2937",
  },
  loadingSub: {
    marginTop: 6,
    color: "#6b7280",
    fontSize: 14,
  },
  skeleton: {
    borderRadius: 8,
    background:
      "linear-gradient(90deg,#ececec 25%,#f8f8f8 50%,#ececec 75%)",
    backgroundSize: "400% 100%",
    animation: "$shimmer 1.3s infinite",
    marginBottom: 18,
  },
  
});