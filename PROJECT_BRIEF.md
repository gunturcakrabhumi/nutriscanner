# Project Brief — Nutrition Scanner

## 1. Product Vision

Nutrition Scanner is a web-based tool that turns confusing food labels into understandable, neutral information.

The product does not tell users whether a product is healthy. It helps users understand the facts printed on the product so that the user can make their own decision.

## 2. Core Philosophy

> **Facts, not verdicts.**

The system should answer:

- What does the label say?
- What do these numbers mean?
- What does this ingredient do in the product?
- How much is present per serving?
- How much is present in the whole package when that calculation is possible?
- What information is missing from the supplied images?

The system should not answer:

- Is this food healthy?
- Should I eat this?
- Is this product safe for me?
- Is this ingredient dangerous?
- How many servings am I allowed to consume?

## 3. Problem

Food labels contain useful information but are often difficult for everyday buyers to interpret quickly.

Common friction:

- small text
- unfamiliar ingredient names
- serving-size confusion
- multiple units
- long ingredient lists
- information distributed across several sides of packaging
- uncertainty about what is actually visible versus what is inferred

## 4. Primary User

### Everyday food buyer

A general consumer buying packaged food or beverages who wants to understand the label without needing specialist nutrition knowledge.

Typical questions:

- "Ini sebenarnya isinya apa?"
- "Satu sajian itu berapa?"
- "Kalau satu bungkus habis, totalnya berapa?"
- "Bahan ini fungsinya apa?"
- "Ada susu/kedelai/gandum di sini?"
- "Informasi apa yang sebenarnya tercantum di label?"

## 5. Secondary Users

Nutrition-aware consumers, including people who:

- monitor calories
- monitor sugar
- monitor sodium
- monitor protein
- compare products
- follow a personal diet or nutrition target

MVP does not turn these users into a separate personalized-diet product.

## 6. Product Positioning

Nutrition Scanner is:

- a label scanner
- a label interpretation tool
- a nutrition-facts explainer
- an ingredient explainer

Nutrition Scanner is not:

- a food-rating app
- a diet coach
- a medical tool
- a food-photo analyzer
- an encyclopedia of food ingredients

## 7. Product Principles

1. Facts over verdicts.
2. Relevance over completeness.
3. User controls input depth.
4. Analyze what is provided; do not require extra photos.
5. Never invent missing information.
6. Never silently choose between conflicting values.
7. Preserve source/raw data.
8. Calculations must be deterministic.
9. AI explanations must remain concise and neutral.
10. MVP scope must remain intentionally narrow.

## 8. Learning & Portfolio Scope

This project is intentionally part of the user's current **automation engineering learning track**.

### Primary learning objectives

- n8n workflow orchestration
- webhook/API integration
- multimodal AI orchestration
- structured data extraction and validation
- multi-step workflow design
- error handling and retries
- workflow observability

### Secondary learning objectives

- web-based client as an automation interface
- multipart/multi-image input
- browser-to-webhook communication

### Explicitly outside the current learning scope

- advanced frontend engineering
- complex backend architecture
- microservices
- Kubernetes
- advanced DevOps
- native Android/iOS development
- desktop application engineering

The project may touch these technologies later, but they must not become prerequisites for the MVP.

## 9. Success Definition

The MVP succeeds when a first-time everyday user can:

1. Open the website.
2. Submit one or more label photos.
3. Understand what the system extracted.
4. Correct an extraction if necessary.
5. Receive a clear explanation of the available nutrition and ingredient facts.
6. Understand which information was not available.
7. Leave the final judgment to themselves.

## 10. Regulatory Context

Indonesia's PerBPOM No. 10 Tahun 2026 on Informasi Nilai Gizi pada Label Pangan Olahan is currently in force. The project may use official labeling requirements as contextual reference, but must not present itself as a regulatory-compliance checker unless a separate, explicitly scoped ruleset is created.

Official BPOM JDIH reference:
Peraturan Badan Pengawas Obat dan Makanan Nomor 10 Tahun 2026 tentang Informasi Nilai Gizi pada Label Pangan Olahan.

## 11. Non-Goals

The project will not attempt to solve all nutrition problems. The narrow product thesis is sufficient:

> **Help a person understand the label they are looking at.**
