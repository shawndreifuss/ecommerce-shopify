export function capitalizeWords(input: string | undefined): string {
    if (!input) {
      return ''; // Return an empty string if input is undefined or null
    }
    
    // First, decode any URL-encoded characters like '%20' (space) or '%26' ('&')
    const decodedInput = decodeURIComponent(input);
    
    // Split the string by hyphens or spaces
    return decodedInput
      .split(/[-\s]+/) // Split by hyphens or spaces
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(' '); // Join words with a space
  }
  