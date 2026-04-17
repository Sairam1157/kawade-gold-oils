import soybeanOil from "@/assets/soybean-oil.jpg";
import palmOil from "@/assets/palm-oil.jpg";
import cookingOil from "@/assets/cooking-oil.jpg";
import sunflowerOil from "@/assets/sunflower-oil.jpg";
import mustardOil from "@/assets/mustard-oil.jpg";
import groundnutOil from "@/assets/groundnut-oil.jpg";

export const IMAGE_PRESET_IDS = [
  "soybean-oil",
  "palm-oil",
  "cooking-oil",
  "sunflower-oil",
  "mustard-oil",
  "groundnut-oil",
] as const;

export type ImagePresetId = (typeof IMAGE_PRESET_IDS)[number];

export const PRODUCT_IMAGE_PRESETS: Record<ImagePresetId, string> = {
  "soybean-oil": soybeanOil,
  "palm-oil": palmOil,
  "cooking-oil": cookingOil,
  "sunflower-oil": sunflowerOil,
  "mustard-oil": mustardOil,
  "groundnut-oil": groundnutOil,
};

export const IMAGE_PRESET_LABELS: Record<ImagePresetId, string> = {
  "soybean-oil": "Soybean oil photo",
  "palm-oil": "Palm oil photo",
  "cooking-oil": "Cooking oil photo",
  "sunflower-oil": "Sunflower oil photo",
  "mustard-oil": "Mustard oil photo",
  "groundnut-oil": "Groundnut oil photo",
};
