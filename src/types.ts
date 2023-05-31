import type { RichTextCustomElement, RichTextCustomLeaf } from "payload/types";

export type Locale = "en" | "ar" | string | undefined;

export type Content = RichTextCustomElement | RichTextCustomLeaf;
