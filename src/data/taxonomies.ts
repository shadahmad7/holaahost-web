import __taxonomies from "./jsons/__taxonomies.json";
import __taxonomies2 from "./jsons/__taxonomies2.json";
import { TaxonomyType } from "./types";

const DEMO_CATEGORIES: TaxonomyType[] = __taxonomies.map((item) => ({
  ...item,
  taxonomy: "category",
}));

const DEMO_CARD: TaxonomyType[] = __taxonomies2.map((item) => ({
  ...item,
  taxonomy: "category",
}));

const DEMO_TAGS: TaxonomyType[] = __taxonomies.map((item) => ({
  ...item,
  taxonomy: "tag",
}));

export { DEMO_CATEGORIES, DEMO_TAGS ,DEMO_CARD};
