// Separat de PropertyBrowser ("use client"), ca să poată fi folosit și pe server.
import type { CategoryKey, Transaction } from "@/lib/properties";

export type Filters = {
  categorie: CategoryKey | "";
  tranzactie: Transaction | "";
  locatie: string;
  camere: string;
  fond: string;
  stare: string;
  pretMin: string;
  pretMax: string;
  sortare: string;
};

export const emptyFilters: Filters = {
  categorie: "",
  tranzactie: "",
  locatie: "",
  camere: "",
  fond: "",
  stare: "",
  pretMin: "",
  pretMax: "",
  sortare: "noi",
};
