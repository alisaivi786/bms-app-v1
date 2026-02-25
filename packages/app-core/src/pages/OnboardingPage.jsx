import { useMemo, useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { useAuth } from "../state/AuthContext";

const steps = [
  {
    title: "Welcome to BMS",
    body: "Your personal balance and money planning workspace starts here.",
    highlights: ["Dashboard overview", "Monthly planning", "Fast data entry"],
    mock: "dashboard"
  },
  {
    title: "Track Income Quickly",
    body: "Add income entries by month and source so your reports stay clear.",
    highlights: ["Add Income modal", "Income source lookup", "Grid with pagination"],
    mock: "income"
  },
  {
    title: "Plan Budget by Category",
    body: "Set estimated amounts and monitor actual values per category and month.",
    highlights: ["Add Category", "Add Budget row", "Estimated vs Actual control"],
    mock: "budget"
  },
  {
    title: "Manage EMI and Debt",
    body: "Create EMI plans, record payments, and monitor total and remaining debt.",
    highlights: ["Create EMI", "Record payment", "Auto sync with Budget"],
    mock: "emi"
  },
  {
    title: "Configure Lookups",
    body: "Use System Configuration to manage custom lookup values used across forms.",
    highlights: ["Add Income Source lookup", "Add Budget Category lookup", "Maintain reusable dropdown values"],
    mock: "lookup"
  },
  {
    title: "Understand Dashboard Insights",
    body: "Use filters and charts to review monthly progress and financial direction.",
    highlights: ["Month/Year filters", "Chart visuals", "Income/Budget comparison"],
    mock: "insight"
  },
  {
    title: "Personalize Your Experience",
    body: "Set your profile, theme, and currency for a better day-to-day workflow.",
    highlights: ["Profile settings", "Theme mode", "Currency preference"],
    mock: "profile"
  }
];

function StepMock({ type }) {
  if (type === "dashboard" || type === "insight") {
    return (
      <div className="onboard-mock-grid">
        <div className="onboard-mock-box">
          <span>Account Balance</span>
          <strong>AED 23,500</strong>
        </div>
        <div className="onboard-mock-box">
          <span>This Month Income</span>
          <strong>AED 5,900</strong>
        </div>
        <div className="onboard-mock-chart">
          <div className="onboard-bar" style={{ height: "30%" }} />
          <div className="onboard-bar" style={{ height: "46%" }} />
          <div className="onboard-bar" style={{ height: "68%" }} />
          <div className="onboard-bar" style={{ height: "54%" }} />
          <div className="onboard-bar" style={{ height: "78%" }} />
        </div>
      </div>
    );
  }
  if (type === "income") {
    return (
      <div className="onboard-mock-list">
        <div className="onboard-mock-row">
          <span>Jan</span>
          <span>Salary</span>
          <strong>AED 4,000</strong>
        </div>
        <div className="onboard-mock-row">
          <span>Jan</span>
          <span>Freelance</span>
          <strong>AED 1,500</strong>
        </div>
        <button className="btn btn-inline" type="button">+ Add Income</button>
      </div>
    );
  }
  if (type === "budget") {
    return (
      <div className="onboard-mock-list">
        <div className="onboard-mock-row">
          <span>Home</span>
          <span>Rent</span>
          <strong>AED 3,200</strong>
        </div>
        <div className="onboard-mock-row">
          <span>EMI</span>
          <span>Card Payment</span>
          <strong>AED 1,000</strong>
        </div>
        <div className="onboard-mock-actions">
          <button className="btn btn-inline" type="button">+ Add Budget</button>
          <button className="btn btn-inline btn-outline" type="button">+ Add Category</button>
        </div>
      </div>
    );
  }
  if (type === "emi") {
    return (
      <div className="onboard-mock-list">
        <div className="onboard-mock-row">
          <span>Car Loan</span>
          <span>10 months</span>
          <strong>AED 1,250</strong>
        </div>
        <div className="onboard-mock-row">
          <span>Credit Card</span>
          <span>8 months</span>
          <strong>AED 750</strong>
        </div>
        <button className="btn btn-inline" type="button">Record Payment</button>
      </div>
    );
  }
  if (type === "lookup") {
    return (
      <div className="onboard-mock-list">
        <div className="onboard-mock-row onboard-mock-row-lookup">
          <span>Lookup Type</span>
          <strong>Income Source</strong>
          <button className="btn btn-inline btn-outline" type="button">+ Add</button>
        </div>
        <div className="onboard-mock-row onboard-mock-row-lookup">
          <span>Lookup Type</span>
          <strong>Budget Category</strong>
          <button className="btn btn-inline btn-outline" type="button">+ Add</button>
        </div>
        <div className="onboard-mock-actions">
          <button className="btn btn-inline" type="button">Save Lookup</button>
          <button className="btn btn-inline btn-outline" type="button">Edit/Delete</button>
        </div>
      </div>
    );
  }
  return (
    <div className="onboard-mock-list">
      <div className="onboard-mock-row">
        <span>Profile Name</span>
        <strong>Ali</strong>
      </div>
      <div className="onboard-mock-row">
        <span>Theme</span>
        <strong>Dark</strong>
      </div>
      <div className="onboard-mock-row">
        <span>Currency</span>
        <strong>AED</strong>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stepIndex, setStepIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const greetingName = useMemo(() => {
    const name = String(user?.displayName || "").trim();
    return name || "Dear Customer";
  }, [user?.displayName]);

  const completeOnboarding = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          onboardingCompleted: true,
          onboardingCompletedAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );
      navigate("/", { replace: true });
    } finally {
      setSaving(false);
    }
  };

  const isLast = stepIndex === steps.length - 1;

  return (
    <section className="onboarding-shell">
      <div className="onboarding-bg-shape onboarding-bg-shape-1" />
      <div className="onboarding-bg-shape onboarding-bg-shape-2" />
      <div className="onboarding-bubbles" aria-hidden="true">
        <span className="onboarding-bubble bubble-1" />
        <span className="onboarding-bubble bubble-2" />
        <span className="onboarding-bubble bubble-3" />
        <span className="onboarding-bubble bubble-4" />
        <span className="onboarding-bubble bubble-5" />
        <span className="onboarding-bubble bubble-6" />
      </div>
      <article className="onboarding-card">
        <p className="onboarding-kicker">BMS Journey</p>
        <h1>Welcome, {greetingName}</h1>
        <p className="muted">Let us walk you through the best way to use BMS.</p>

        <div className="onboarding-progress" aria-label="Progress">
          {steps.map((item, index) => (
            <span
              key={item.title}
              className={`onboarding-dot ${index === stepIndex ? "active" : ""} ${index < stepIndex ? "done" : ""}`}
            />
          ))}
        </div>

        <div key={steps[stepIndex].title} className="onboarding-step-card">
          <h2>{steps[stepIndex].title}</h2>
          <p>{steps[stepIndex].body}</p>
          <div className="onboarding-feature-list">
            {steps[stepIndex].highlights.map((item) => (
              <div className="onboarding-feature-item" key={item}>
                <span className="onboarding-feature-dot" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <StepMock type={steps[stepIndex].mock} />
        </div>

        <div className="onboarding-actions">
          <button className="btn btn-outline" type="button" onClick={completeOnboarding} disabled={saving}>
            Skip
          </button>
          <div className="onboarding-actions-right">
            <button
              className="btn btn-outline"
              type="button"
              onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={saving || stepIndex === 0}
            >
              Back
            </button>
            {isLast ? (
              <button className="btn" type="button" onClick={completeOnboarding} disabled={saving}>
                {saving ? "Starting..." : "Get Started"}
              </button>
            ) : (
              <button
                className="btn"
                type="button"
                onClick={() => setStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
                disabled={saving}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}
