export interface FligthConfirmation {
  messaging_product: string;
  to:                string;
  type:              string;
  template:          Template;
}

export interface Template {
  name:       string;
  language:   Language;
  components: Component[];
}

export interface Component {
  type:       string;
  parameters: Parameter[];
}

export interface Parameter {
  type:       string;
  document?:  Document;
  text?:      string;
  date_time?: DateTime;
}

export interface DateTime {
  fallback_value: string;
  day_of_month:   number;
  year:           number;
  month:          number;
  hour:           number;
  minute:         number;
}

export interface Document {
  link: string;
  filename: string;
}

export interface Language {
  code: string;
}
