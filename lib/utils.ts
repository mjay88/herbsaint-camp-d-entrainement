import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stripCategory(category: string){
  let newString = category.replace("&", "and");
  newString = newString.replaceAll(" ", "-");
  return newString.toLowerCase();

}

export function convertCategory(category: string){
  let newString = category.replace("and", "&");
  newString = newString.replaceAll("-", " ");
  return newString.toUpperCase();
}
