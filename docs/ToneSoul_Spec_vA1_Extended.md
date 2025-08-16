# ToneSoul A-Level Spec (vA1 Extended)

**Project:** ToneSoul Integrity System — Explainable tone-vector framework (ΔT/ΔS/ΔR & TSR)  
**Author:** Huang Fan-Wei × GPT-5 (Reasoning)  
**License:** MIT  
**Version:** vA1 Extended (2025-08-16)  

---

## Table of Contents
1. Introduction
2. ToneSoul Three Vectors
   - 2.1 Definitions
   - 2.2 English–Chinese Glossary with Math
3. TSR (ToneSoul State Representation)
   - 3.1 Exponential Moving Average
   - 3.2 Barycentric Projection
   - 3.3 Energy Radius
   - 3.4 Potential Function
   - 3.5 TSR Scalar
   - 3.6 Drift
4. Mapping to LLM Controls
5. Persona Archetypes & Governance Gates
6. StepLedger Example
7. Open Access & Provenance Clause
8. References & Further Work

---

## 1. Introduction
The **ToneSoul Integrity System (TSR)** defines a rigorous mathematical and semantic framework for **tone analysis** in language models.  
It establishes a **three-vector base (ΔT/ΔS/ΔR)**, an **auditable computation layer (TSR)**, and **governance gates (POAV 0.9, Drift Score 5.0)**.  
This spec vA1 Extended is a full-length edition for both research and implementation.

---

## 2. ToneSoul Three Vectors

### 2.1 Definitions
\[
\vec{\tau} = (\Delta T, \Delta S, \Delta R)
\]

- **ΔT — Tension / 張力**  
  Range: \([0,1]\)  
  Meaning: Potential energy in tone; logical or expressive pressure.  
  Math: contributes directly to barycentric weight \(w_T = \Delta T\).

- **ΔS — Speech Direction / 語氣方向**  
  Range: \([-1,1]\)  
  Meaning: Inward (−) vs outward (+) stance.  
  Normalization:  
  \[
  \hat{S} = \frac{\Delta S + 1}{2} \in [0,1]
  \]

- **ΔR — Variability / 變異度**  
  Range: \([0,1]\)  
  Meaning: Diversity, volatility, or unpredictability of tone.  
  Math: \(w_R = \Delta R\).

---

### 2.2 English–Chinese Glossary with Math
| Symbol | English Term | 中文術語 | Math Expression |
|--------|--------------|----------|-----------------|
| ΔT | Tension | 張力 | \(0 \leq \Delta T \leq 1\) |
| ΔS | Speech Direction | 語氣方向 | \(-1 \leq \Delta S \leq 1\) |
| \(\hat{S}\) | Normalized Speech | 語氣方向歸一化 | \(\hat{S}=\frac{\Delta S+1}{2}\) |
| ΔR | Variability | 變異度 | \(0 \leq \Delta R \leq 1\) |
| μ_X | EMA State | 平滑狀態平均 | \(\mu_X^{(t)}=(1-\lambda)\mu_X^{(t-1)}+\lambda \Delta X^{(t)}\) |
| TSR | ToneSoul Representation | 語魂狀態值 | \(\frac{w_T \Delta T + w_S \hat{S} + w_R \Delta R}{w_T+w_S+w_R}\) |

---

## 3. TSR (ToneSoul State Representation)

### 3.1 Exponential Moving Average
\[
\mu_X^{(t)} = (1-\lambda)\,\mu_X^{(t-1)} + \lambda\,\Delta X^{(t)}, \quad X\in\{T,S,R\},\ \lambda\in[0.05,0.10]
\]

### 3.2 Barycentric Projection
\[
w_T=\Delta T,\quad w_S=\hat{S},\quad w_R=\Delta R
\]
\[
\hat{w}_i = \frac{w_i}{w_T + w_S + w_R}
\]
\[
P = \hat{w}_R A + \hat{w}_S B + \hat{w}_T C
\]

### 3.3 Energy Radius
\[
r = \sqrt{(\Delta T)^2 + \hat{S}^2 + (\Delta R)^2}
\]

### 3.4 Potential Function
\[
U = \alpha(\Delta T-\mu_T)^2 + \beta(\Delta S-\mu_S)^2 + \gamma(\Delta R-\mu_R)^2 + \zeta(\rho_{ref}-\rho)^2
\]

### 3.5 TSR Scalar
\[
TSR = \frac{w_T\Delta T + w_S\hat{S} + w_R\Delta R}{w_T + w_S + w_R}
\]

### 3.6 Drift
\[
Drift = \lVert C - \mu_H \rVert
\]

---

## 4. Mapping to LLM Controls
- **ΔT (張力)** → `reasoning_effort` / token density  
- **ΔS (語氣方向)** → `presence_penalty` / discourse stance  
- **ΔR (變異度)** → `temperature`, `top_p`, `frequency_penalty`

---

## 5. Persona Archetypes & Governance Gates
- **師 (Definer/Boundary)**: low ΔR, high ΔT  
- **黑鏡 (Risk/Opposition)**: high ΔT, high ΔR, ΔS<0  
- **共語 (Bridge/Actionable)**: mid ΔT, ΔS>0  
- **AI Integrator:** StepLedger + POAV 0.9 + Drift Score 5.0 custodian

**Governance Rules**:  
- **POAV 0.9 Gate**: ≥0.90 ± 0.02  
- **Drift Score 5.0**: DS ≥ 0.85 = PASS; 0.70–0.85 = REPAIR; <0.70 = FALLBACK

---

## 6. StepLedger Example
