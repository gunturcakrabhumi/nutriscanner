# UI Specification — Nutrition Scanner

## 1. UX Principle

> Fast path to useful information.

Do not require account creation or profile setup before the first scan.

## 2. Landing Page

Primary CTA:

> Scan a Label

Secondary options:

> Paste Label Text
> Enter Manually

Short explanation:

> Understand what's written on your food label.

## 3. Scan Screen

Allow:

- camera capture on supported mobile browsers
- image upload
- 1–4 images
- thumbnail preview
- remove/reorder images before submit

Do not require the user to identify which image is "front", "nutrition", or "ingredients".

## 4. Review Screen

Title:

> Here's what we found

Sections:

- Product
- Serving
- Nutrition
- Ingredients
- Allergens
- Missing information
- Conflicts

Every editable value should visibly indicate that it was extracted and can be corrected.

CTA:

> Confirm & Analyze

## 5. Result Screen

Suggested hierarchy:

1. Product identity
2. Nutrition snapshot
3. Per-serving context
4. Package totals when calculable
5. Ingredients
6. Things to notice
7. Missing information
8. Neutral summary

## 6. Ingredient UI

Keep each explanation short.

Example:

```text
Soy lecithin
Emulsifier used to help ingredients mix evenly.
```

Optional detail should be user-triggered.

## 7. Missing Information

Use explicit wording:

> Not available in the provided label images.

Do not imply that the product itself lacks the information; only state that it was not available in the supplied input unless the label explicitly says so.

## 8. Conflict UI

Example:

```text
Conflicting information detected

Sugar
Photo 2: 15 g
Photo 4: 18 g

Please choose the value that matches the label.
```

## 9. Neutrality

Avoid:

- healthy
- unhealthy
- good/bad
- dangerous
- safe
- recommended
- avoid

unless the exact wording is part of a directly quoted label and is clearly presented as label text.

## 10. Responsive Design

Mobile is primary because food labels are commonly scanned using phones.

Desktop should remain fully usable for uploaded images.

## 11. Accessibility

Minimum expectations:

- readable contrast
- keyboard-accessible controls
- labels for form fields
- image upload feedback
- error messages not dependent on color alone
- screen-reader-friendly result structure
