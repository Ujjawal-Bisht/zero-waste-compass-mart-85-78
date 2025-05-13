
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Animation delay utility
export function getStaggeredDelay(index: number, baseDelay: number = 0.1): number {
  return baseDelay * index
}

// Random animation duration within a range
export function getRandomDuration(min: number = 3, max: number = 7): number {
  return Math.random() * (max - min) + min
}

// Get random position for decorative elements
export function getRandomPosition(min: number = -20, max: number = 20): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Generate random opacity value
export function getRandomOpacity(min: number = 0.05, max: number = 0.2): number {
  return Math.random() * (max - min) + min
}
