// Types cho dự án Breast Cancer Prediction

export interface PatientData {
  type_of_breast_surgery: "BREAST CONSERVING" | "MASTECTOMY" | "";
  cancer_type: "Breast Cancer" | "Breast Sarcoma" | "";
  cellularity: "High" | "Low" | "Moderate" | "";
  chemotherapy: 0 | 1;
  "pam50_+_claudin-low_subtype":
    | "Basal"
    | "Her2"
    | "LumA"
    | "LumB"
    | "NC"
    | "Normal"
    | "claudin-low"
    | "";
  neoplasm_histologic_grade: 1 | 2 | 3;
  her2_status: "Negative" | "Positive" | "";
  hormone_therapy: 0 | 1;
  lymph_nodes_examined_positive: number;
  nottingham_prognostic_index: number;
  pr_status: "Negative" | "Positive" | "";
  radio_therapy: 0 | 1;
}

export interface PredictionResult {
  cancer_type_detailed: string;
  cancer_type_code: number;
}

export interface APIError {
  detail: string;
}

// Constants
export const CANCER_TYPE_DESCRIPTIONS: Record<number, string> = {
  0: "General breast cancer",
  1: "Invasive ductal carcinoma",
  2: "Invasive lobular carcinoma",
  3: "Invasive mixed mucinous carcinoma",
  4: "Mixed ductal and lobular carcinoma",
};

export const SURGERY_TYPE_DESCRIPTIONS: Record<string, string> = {
  "BREAST CONSERVING":
    "Breast conserving surgery - preserves most breast tissue",
  MASTECTOMY: "Mastectomy - removes all or most breast tissue",
};

export const PAM50_DESCRIPTIONS: Record<string, string> = {
  Basal: "Basal-like - Usually negative for hormone receptors",
  Her2: "HER2-enriched - High HER2 levels",
  LumA: "Luminal A - Hormone receptor positive, good prognosis",
  LumB: "Luminal B - Hormone receptor positive, intermediate prognosis",
  Normal: "Normal-like - Similar to normal breast tissue",
  NC: "Not Classified - Cannot be classified",
  "claudin-low": "Claudin-low - Special subtype with stem cell characteristics",
};
