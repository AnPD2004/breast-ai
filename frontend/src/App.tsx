import { useState } from "react";
import "./App.css";
import type { PatientData, PredictionResult } from "./types";
import PredictionDetails from "./components/PredictionDetails";

function App() {
  const [formData, setFormData] = useState<PatientData>({
    type_of_breast_surgery: "",
    cancer_type: "",
    cellularity: "",
    chemotherapy: 0,
    "pam50_+_claudin-low_subtype": "",
    neoplasm_histologic_grade: 1,
    her2_status: "",
    hormone_therapy: 0,
    lymph_nodes_examined_positive: 0,
    nottingham_prognostic_index: 0,
    pr_status: "",
    radio_therapy: 0,
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name.includes("therapy") ||
        name === "chemotherapy" ||
        name === "radio_therapy" ||
        name === "neoplasm_histologic_grade" ||
        name === "lymph_nodes_examined_positive"
          ? Number(value)
          : name === "nottingham_prognostic_index"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: PredictionResult = await response.json();
      setPrediction(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during prediction"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎗️ Breast Cancer Prediction System</h1>
        <p>Enter clinical information to predict detailed breast cancer type</p>
      </header>

      <main className="main-content">
        <form onSubmit={handleSubmit} className="patient-form">
          <div className="form-grid">
            {/* Left Column */}
            <div className="form-column">
              <div className="form-section">
                <h3>Surgery & Cancer Information</h3>

                <div className="form-group">
                  <label htmlFor="type_of_breast_surgery">
                    Type of breast surgery:
                  </label>
                  <select
                    id="type_of_breast_surgery"
                    name="type_of_breast_surgery"
                    value={formData.type_of_breast_surgery}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select surgery type</option>
                    <option value="BREAST CONSERVING">Breast Conserving</option>
                    <option value="MASTECTOMY">Mastectomy</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="cancer_type">Cancer type:</label>
                  <select
                    id="cancer_type"
                    name="cancer_type"
                    value={formData.cancer_type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select cancer type</option>
                    <option value="Breast Cancer">Breast Cancer</option>
                    <option value="Breast Sarcoma">Breast Sarcoma</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="cellularity">Cellularity:</label>
                  <select
                    id="cellularity"
                    name="cellularity"
                    value={formData.cellularity}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select cellularity</option>
                    <option value="High">High</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="neoplasm_histologic_grade">
                    Histologic grade (1-3):
                  </label>
                  <select
                    id="neoplasm_histologic_grade"
                    name="neoplasm_histologic_grade"
                    value={formData.neoplasm_histologic_grade}
                    onChange={handleInputChange}
                    required
                  >
                    <option value={1}>Grade 1</option>
                    <option value={2}>Grade 2</option>
                    <option value={3}>Grade 3</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Middle Column */}
            <div className="form-column">
              <div className="form-section">
                <h3>Molecular & Receptor Status</h3>

                <div className="form-group">
                  <label htmlFor="pam50_+_claudin-low_subtype">
                    PAM50 Subtype:
                  </label>
                  <select
                    id="pam50_+_claudin-low_subtype"
                    name="pam50_+_claudin-low_subtype"
                    value={formData["pam50_+_claudin-low_subtype"]}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select PAM50 subtype</option>
                    <option value="Basal">Basal</option>
                    <option value="Her2">Her2</option>
                    <option value="LumA">LumA</option>
                    <option value="LumB">LumB</option>
                    <option value="Normal">Normal</option>
                    <option value="NC">NC</option>
                    <option value="claudin-low">claudin-low</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="her2_status">HER2 status:</label>
                  <select
                    id="her2_status"
                    name="her2_status"
                    value={formData.her2_status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select HER2 status</option>
                    <option value="Positive">Positive</option>
                    <option value="Negative">Negative</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="pr_status">PR status:</label>
                  <select
                    id="pr_status"
                    name="pr_status"
                    value={formData.pr_status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select PR status</option>
                    <option value="Positive">Positive</option>
                    <option value="Negative">Negative</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="lymph_nodes_examined_positive">
                    Positive lymph nodes examined:
                  </label>
                  <input
                    type="number"
                    id="lymph_nodes_examined_positive"
                    name="lymph_nodes_examined_positive"
                    value={formData.lymph_nodes_examined_positive}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="form-column">
              <div className="form-section">
                <h3>Treatment & Clinical Parameters</h3>

                <div className="form-group">
                  <label htmlFor="chemotherapy">Chemotherapy:</label>
                  <select
                    id="chemotherapy"
                    name="chemotherapy"
                    value={formData.chemotherapy}
                    onChange={handleInputChange}
                    required
                  >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="hormone_therapy">Hormone therapy:</label>
                  <select
                    id="hormone_therapy"
                    name="hormone_therapy"
                    value={formData.hormone_therapy}
                    onChange={handleInputChange}
                    required
                  >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="radio_therapy">Radiotherapy:</label>
                  <select
                    id="radio_therapy"
                    name="radio_therapy"
                    value={formData.radio_therapy}
                    onChange={handleInputChange}
                    required
                  >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="nottingham_prognostic_index">
                    Nottingham prognostic index:
                  </label>
                  <input
                    type="number"
                    id="nottingham_prognostic_index"
                    name="nottingham_prognostic_index"
                    value={formData.nottingham_prognostic_index}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "🔄 Predicting..." : "🔍 Predict"}
          </button>
        </form>

        {error && (
          <div className="error-message">
            <h3>❌ Error</h3>
            <p>{error}</p>
          </div>
        )}

        {prediction && (
          <div className="prediction-result">
            <h3>🎯 Prediction Results</h3>
            <PredictionDetails prediction={prediction} />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          ⚠️ Note: This result is for reference only. Please consult with a
          specialist doctor for professional medical advice.
        </p>
      </footer>
    </div>
  );
}

export default App;
