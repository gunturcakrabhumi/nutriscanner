# Data Schema — Nutrition Scanner

## 1. Schema Principles

1. Preserve source facts.
2. Preserve original units.
3. Preserve calculation provenance.
4. Never overwrite source data with AI interpretation.
5. Allow optional fields.
6. Support additional nutrients.
7. Preserve ingredient order and nested structure where possible.
8. Track source image.
9. Track unresolved conflicts.
10. Missing is different from unknown/inferred.

## 2. Canonical Product Object

```json
{
  "identity": {
    "name": null,
    "brand": null,
    "category": null
  },
  "serving": {
    "size": null,
    "unit": null,
    "servings_per_container": null,
    "basis": null
  },
  "nutrition": {
    "energy": null,
    "protein": null,
    "total_fat": null,
    "saturated_fat": null,
    "carbohydrate": null,
    "sugar": null,
    "sodium": null,
    "additional": []
  },
  "ingredients": {
    "raw_text": null,
    "items": []
  },
  "allergens": {
    "explicit_declaration": null,
    "items": []
  },
  "label_metadata": {
    "language": null,
    "source_images": [],
    "coverage": {}
  },
  "missing_information": [],
  "conflicts": []
}
```

## 3. Nutrition Value Object

Every nutrition value should conceptually contain:

```json
{
  "value": 12,
  "unit": "g",
  "basis": "per_serving",
  "original_value": 12,
  "original_unit": "g",
  "source_image_ids": ["img-02"],
  "confidence": 0.98
}
```

The exact persistence model may differ, but these concepts must remain available.

## 4. Basis Values

Supported canonical bases:

- `per_serving`
- `per_100g`
- `per_100ml`
- `per_package`
- `declared_other`

Never remove basis context.

## 5. Ingredient Item

```json
{
  "name": "Soy lecithin",
  "position": 5,
  "parent": null,
  "children": [],
  "source_image_ids": ["img-03"]
}
```

For compound ingredients:

```text
Chocolate compound
 ├─ Sugar
 ├─ Cocoa powder
 └─ Vegetable fat
```

Do not flatten nested composition if the extraction model can reliably preserve it.

## 6. Allergen Data

Explicit declaration and ingredient presence are separate concepts.

Example:

```json
{
  "explicit_declaration": {
    "present": true,
    "items": ["Milk", "Soy"]
  },
  "ingredient_indicators": ["Milk", "Soy"]
}
```

Never transform ingredient presence into a formal allergen declaration if the label did not explicitly declare it.

## 7. Source Traceability

Every extracted field that materially affects calculations should be traceable to one or more source images.

Example:

```json
{
  "field": "nutrition.sugar",
  "source_image_ids": ["img-02"],
  "raw_text": "Gula 15 g"
}
```

## 8. Calculated Data

Calculated values must be separate from declared values.

```json
{
  "calculated": {
    "package": {
      "energy_kcal": 600,
      "sugar_g": 48
    }
  }
}
```

Do not overwrite the declared serving value with the calculated package value.

## 9. Additional Nutrients

Standard fields should be first-class.

Additional fields should be flexible:

```json
{
  "name": "calcium",
  "value": 120,
  "unit": "mg",
  "basis": "per_serving"
}
```

This prevents schema changes whenever a product declares another nutrient.

## 10. Null vs Missing

`null` means the field is not available in the canonical dataset.

`missing_information` explains which expected information was not present in the supplied input.

Never use placeholder values such as:

- `0`
- `"unknown"`
- `"probably"`
- fabricated defaults

to represent absent data.
