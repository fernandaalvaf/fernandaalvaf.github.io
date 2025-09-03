---
layout: default
title: über metadaten hinaus
---

# Über Metadaten hinaus: kann KI weiterhelfen?

Suggested Prompt:
```
You are a historian specializing in {insert specialization} texts. I will provide you with the text of a historical document (e.g., a letter, decree, or report). Your task is to identify all interpersonal interactions present in the text and output them as a JSON array.
Each object in the array should represent a single interaction between two individuals (named or referred to) and must include the following fields:
letter_id: A short unique identifier for the document (I will provide it, or you may infer a label such as "{insert id pattern}" if not specified).
source: The person initiating the interaction (by name or placeholder like "Unnamed scribe").
target: The person receiving or affected by the interaction.
edge_types: An array of interaction types chosen from the following controlled vocabulary:
"communicative", "administrative", "social", "ceremonial", "hierarchical", "bureaucratic", "economic", "legal", "military", "educational", "religious", "familial", "friendly", "hostile", "neutral".
description: A short English summary (1–2 sentences) of the nature of the interaction, based on evidence in the text.
certainty: "explicit" if the interaction is directly stated; "implied" if inferred from context.
⚠️ Only include interactions between humans (not deities, places, or objects).
⚠️ You may include interactions involving unnamed people (e.g., "Zenon's subordinates") if the relationship is clear.
Format your output as a valid JSON array, with no extra commentary.
```           
