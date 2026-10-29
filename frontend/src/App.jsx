import { useEffect, useState } from "react";

function App() {
  const [etudiants, setEtudiants] = useState([]);
  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState("");

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const chargerEtudiants = () => {
    fetch("http://localhost:5000/api/etudiants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Impossible de charger les étudiants");
        }
        return response.json();
      })
      .then((data) => {
        setEtudiants(data);
        setErreur("");
      })
      .catch((error) => setErreur(error.message));
  };

  useEffect(() => {
    chargerEtudiants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setSucces("");

    try {
      const response = await fetch("http://localhost:5000/api/etudiants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, age: Number(age) })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Impossible d'ajouter l'étudiant");
      }

      setNom("");
      setEmail("");
      setAge("");
      setSucces("Étudiant ajouté avec succès !");
      chargerEtudiants();
    } catch (err) {
      setErreur(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/etudiants/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Suppression impossible");
      }

      setSucces("Étudiant supprimé avec succès !");
      chargerEtudiants();
    } catch (err) {
      setErreur(err.message);
    }
  };

  return (
    <div style={{
      maxWidth: "760px",
      margin: "40px auto",
      padding: "24px",
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
    }}>
      <header style={{ borderBottom: "2px solid #e2e8f0", paddingBottom: "16px", marginBottom: "24px" }}>
        <h1 style={{ color: "#1e293b", margin: 0, fontSize: "1.8rem" }}>
          🎓 Gestion des Étudiants — ESISA S101
        </h1>
        <p style={{ color: "#64748b", margin: "6px 0 0 0", fontSize: "0.95rem" }}>
          TP N°1 — MERN Stack (MongoDB, Express, React, Node.js)
        </p>
      </header>

      {erreur && (
        <div style={{ backgroundColor: "#fee2e2", color: "#991b1b", padding: "10px 14px", borderRadius: "6px", marginBottom: "16px" }}>
          ⚠️ {erreur}
        </div>
      )}
      {succes && (
        <div style={{ backgroundColor: "#dcfce7", color: "#166534", padding: "10px 14px", borderRadius: "6px", marginBottom: "16px" }}>
          ✅ {succes}
        </div>
      )}

      <section style={{ backgroundColor: "#f8fafc", padding: "18px", borderRadius: "8px", marginBottom: "28px" }}>
        <h2 style={{ fontSize: "1.2rem", marginTop: 0, color: "#334155" }}>Ajouter un étudiant</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Nom complet"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            style={{ flex: "1 1 180px", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ flex: "1 1 200px", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
          />
          <input
            type="number"
            placeholder="Âge"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            min="16"
            max="100"
            style={{ flex: "0 1 90px", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 18px",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            + Ajouter
          </button>
        </form>
      </section>

      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <h2 style={{ fontSize: "1.2rem", margin: 0, color: "#334155" }}>
            Liste des étudiants ({etudiants.length})
          </h2>
          <button
            onClick={chargerEtudiants}
            style={{ background: "none", border: "1px solid #cbd5e1", borderRadius: "4px", padding: "6px 12px", cursor: "pointer", fontSize: "0.85rem", color: "#475569" }}
          >
            🔄 Actualiser
          </button>
        </div>

        {etudiants.length === 0 && !erreur ? (
          <p style={{ color: "#94a3b8", fontStyle: "italic" }}>Aucun étudiant enregistré pour le moment.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {etudiants.map((etudiant) => (
              <li
                key={etudiant._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  borderBottom: "1px solid #f1f5f9",
                  backgroundColor: "#ffffff",
                  borderRadius: "6px",
                  marginBottom: "8px"
                }}
              >
                <div>
                  <strong style={{ color: "#0f172a", fontSize: "1rem" }}>{etudiant.nom}</strong>
                  <div style={{ color: "#64748b", fontSize: "0.88rem" }}>
                    {etudiant.email} • {etudiant.age} ans
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(etudiant._id)}
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "6px 12px",
                    fontSize: "0.85rem",
                    cursor: "pointer"
                  }}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
