import { DOMAIN_URL } from "@/constants";
import { isBefore } from "date-fns";
import { v4 as uuidv4 } from "uuid";

/**
 * Utility function to check if a table is locked based on the locked_until timestamp.
 *
 * @param {string | null} lockedUntil - The timestamp indicating when the table is locked until. Can be null if the table is not locked.
 * @returns {boolean} - Returns true if the table is currently locked, false otherwise.
 *
 * @example
 * // Example usage:
 * const lockedUntil = '2024-10-04T12:00:00.000Z';
 * const isLocked = isTableLocked(lockedUntil);
 * if (isLocked) {
 *   console.log("Table is locked.");
 * } else {
 *   console.log("Table is available.");
 * }
 */
export function isTableLocked(lockedUntil: string | null): boolean {
  if (!lockedUntil) return false; // If there's no lock time, the table is not locked

  const currentTime = new Date();
  const lockedUntilDate = new Date(lockedUntil);

  return isBefore(currentTime, lockedUntilDate); // Check if current time is before the locked time
}

/**
 * Generates a QR code URL for the given input code.
 *
 * This function uses the Google Chart API to generate a URL for the QR code.
 * The QR code can then be used to encode the provided input code.
 *
 * @param {string} code - The code to be embedded in the QR code.
 * @returns {string} The URL of the generated QR code.
 */
export function generateQRCodeURL(code: string): string {
  if (typeof code !== "string" || code.trim() === "") {
    throw new Error("Invalid code provided. Code must be a non-empty string.");
  }

  const encodedCode = encodeURIComponent(code);
  const qrCodeURL = `${DOMAIN_URL}/coffee-nerds-menu?code=${encodedCode}`;

  return qrCodeURL;
}

export default generateQRCodeURL;

/**
 * Generates a readable, unique key using UUID v4.
 * It returns only the first segment of the UUID to keep it short.
 *
 * @returns {string} A short, unique identifier
 */
export const generateReadableQRCode = (): string => {
  // const uniquePart = uuidv4().split("-")[0]; // Get only the first segment of UUID
  const uniquePart = uuidv4(); // Get only the first segment of UUID
  return uniquePart; // Example output: "a1b2c3d4"
};
