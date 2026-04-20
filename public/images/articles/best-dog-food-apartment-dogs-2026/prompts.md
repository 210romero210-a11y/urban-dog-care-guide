# Image Prompts for "Best Dog Food for Apartment Dogs 2026"

This file contains 7 image prompts for Stable Diffusion generation.
Each prompt is designed for a warm, friendly, professional blog aesthetic.

## Image Specifications
- Aspect Ratio: 16:9 (landscape) or 4:3
- Style: Professional photography, warm lighting
- Color Palette: Warm amber #f59e0b accents, navy #1e3a8a as accent

---

## Image 1: Hero Image
**Filename:** hero.jpg  
**Size:** 1200x630px  
**Prompt:**
```
Golden Retriever happy dog eating from a stylish modern food bowl in a bright kitchen with warm natural lighting, healthy shiny coat, happy cheerful expression, home environment, professional product photography, clean background, high quality, 4k, photorealistic
```

---

## Image 2: Quality Ingredients
**Filename:** quality-ingredients.jpg  
**Size:** 800x600px  
**Prompt:**
```
Premium dog food ingredients spread on wooden surface - chicken, vegetables, sweet potato, professional food photography, warm kitchen lighting, clean minimal background, high quality, 4k
```

---

## Image 3: Small Breed Dog
**Filename:** small-breed.jpg  
**Size:** 800x600px  
**Prompt:**
```
Cute small breed dog like Chihuahua in apartment living room, comfortable on rug, happy expression, warm afternoon light through window, indoor pet photography, clean background, high quality, 4k
```

---

## Image 4: Dog Food Comparison
**Filename:** food-comparison.jpg  
**Size:** 800x600px  
**Prompt:**
```
Various premium dog food bags and cans arranged on kitchen counter, professional product photography, warm natural lighting, modern kitchen background, high quality, 4k
```

---

## Image 5: Portion Control
**Filename:** portion-control.jpg  
**Size:** 800x600px  
**Prompt:**
```
Measuring cup with dog food next to stainless steel dog bowl, portion control concept, warm kitchen lighting, clean background, professional photography, high quality, 4k
```

---

## Image 6: Healthy Coat
**Filename:** healthy-coat.jpg  
**Size:** 800x600px  
**Prompt:**
```
Healthy Golden Retriever with shiny glossy coat being petted by owner, showing bond and health, warm indoor lighting, living room background, tender moment, professional pet photography, high quality, 4k
```

---

## Image 7: Senior Dog
**Filename:** senior-dog.jpg  
**Size:** 800x600px  
**Prompt:**
```
Gentle senior dog resting on comfortable orthopedic dog bed, relaxed and peaceful expression, soft blanket, warm afternoon light, cozy apartment setting, professional pet photography, high quality, 4k
```

---

## Notes for Generation
- Use negative prompt: dark, blurry, low quality, watermark, text, cartoon, deformed
- Seed: Use consistent seed for style consistency
- CFG Scale: 7-9
- Steps: 25-35

## Generation Commands (if using Stable Diffusion WebUI API)
```bash
curl -X POST http://127.0.0.1:7860/sdapi/v1/txt2img \
  -H "Content-Type: application/json" \
  -d '{"prompt": "...", "negative_prompt": "...", "width": 800, "height": 600, "steps": 30}'
```