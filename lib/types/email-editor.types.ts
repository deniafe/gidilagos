// lib/types/email-editor.types.ts

export type ElementType =
  | "text"
  | "image"
  | "button"
  | "divider"
  | "spacer"
  | "social"
  | "columns"; // Represents a row with multiple columns

// Base style properties common to many elements
export interface BaseElementStyle {
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  marginTop?: string;
  marginBottom?: string;
  backgroundColor?: string;
  // Add more common styles as needed
}

export interface TextElementStyle extends BaseElementStyle {
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: "normal" | "bold";
  lineHeight?: string;
  textAlign?: "left" | "center" | "right" | "justify";
}

export interface ImageElementStyle extends BaseElementStyle {
  width?: string; // e.g., '100%', '150px'
  height?: string; // e.g., 'auto', '100px'
  textAlign?: "left" | "center" | "right"; // For alignment of the image block
}

export interface ButtonElementStyle extends BaseElementStyle {
  backgroundColor?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: "normal" | "bold";
  textAlign?: "left" | "center" | "right"; // Alignment of the button within its container
  padding?: string; // Inner padding of the button
  borderRadius?: string;
  border?: string;
  width?: string; // 'auto', '100%' or fixed
}

export interface DividerElementStyle {
  paddingTop?: string;
  paddingBottom?: string;
  borderTopWidth?: string;
  borderTopStyle?: "solid" | "dashed" | "dotted";
  borderTopColor?: string;
}

export interface SpacerElementStyle {
  backgroundColor: string;
  height?: string; // e.g., '20px'
}

export interface SocialElementStyle extends BaseElementStyle {
  align?: "left" | "center" | "right";
  iconStyle?: "color" | "black" | "white"; // Predefined styles for icons
  iconSize?: string;
  iconSpacing?: string;
}

// Base Email Element Interface
export interface EmailElement<TStyle = BaseElementStyle, TProps = {}> {
  id: string; // Unique ID for the element
  type: ElementType;
  name: string; // User-friendly name like "Headline Text" or "Hero Image"
  props: TProps;
  style: TStyle;
}

// Specific Element Types
export interface TextElementProps {
  content: string; // HTML content
}
export type TextEmailElement = EmailElement<TextElementStyle, TextElementProps>;

export interface ImageElementProps {
  src: string;
  alt?: string;
  href?: string; // Link URL
}
export type ImageEmailElement = EmailElement<ImageElementStyle, ImageElementProps>;

export interface ButtonElementProps {
  text: string;
  href: string; // Link URL
}
export type ButtonEmailElement = EmailElement<ButtonElementStyle, ButtonElementProps>;

export interface DividerElementProps {}
export type DividerEmailElement = EmailElement<DividerElementStyle, DividerElementProps>;

export type SpacerEmailElement = EmailElement<SpacerElementStyle, SpacerElementProps>;

export interface SocialLink {
  id: string;
  platform: "facebook" | "twitter" | "instagram" | "linkedin" | "youtube" | "website" | "custom";
  url: string;
  iconSrc?: string; // for custom
}
export interface SocialElementProps {
  links: SocialLink[];
}
export type SocialEmailElement = EmailElement<SocialElementStyle, SocialElementProps>;


// Column Structure
export interface EmailEditorColumn {
  id: string;
  widthFactor: number; // e.g., 0.5 for 50%, sum of factors in a row should be 1 (or 12 for a 12-grid system)
  elements: AnyEmailElement[]; // Elements within this column
  style?: BaseElementStyle; // Style for the column itself (e.g., background, padding)
}

// Columns Element (Represents a Row containing multiple columns)
export interface ColumnsElementProps {
  // e.g. "1_col", "2_col_equal", "3_col_varied_left"
  // This could also be represented by the structure of the columns array directly
  layoutType?: string;
}
export interface ColumnsElementStyle extends BaseElementStyle {} // Style for the entire row/columns container
export interface ColumnsEmailElement extends EmailElement<ColumnsElementStyle, ColumnsElementProps> {
  type: "columns";
  columns: EmailEditorColumn[];
}

// Union type for any possible element
export type AnyEmailElement =
  | TextEmailElement
  | ImageEmailElement
  | ButtonEmailElement
  | DividerEmailElement
  | SpacerEmailElement
  | SocialEmailElement
  | ColumnsEmailElement;


// Overall Email Design Structure
export interface EmailGlobalStyle {
  fontFamily?: string;
  backgroundColor?: string; // Email body background
  contentBackgroundColor?: string; // Background of the main content area
  contentWidth?: string; // e.g., "600px"
  textColor?: string; // Default text color
  linkColor?: string; // Default link color
}

export interface EmailDesign {
  id?: string; // Optional: if loading an existing template
  name?: string; // Optional: if loading an existing template
  globalStyle: EmailGlobalStyle;
  elements: AnyEmailElement[]; // Top-level elements (usually ColumnsEmailElement or full-width elements)
}

// For the sidebar list of draggable items
export interface DraggableItem {
  id: string; // Unique ID for the draggable item type
  type: ElementType;
  icon: React.ReactNode; // Icon for the sidebar
  label: string; // Label for the sidebar
  defaultElement: () => Omit<AnyEmailElement, "id" | "name">; // Function to create a default instance
}