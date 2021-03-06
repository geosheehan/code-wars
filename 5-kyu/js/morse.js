// Morse Encoding
// https://www.codewars.com/kata/536602df5d0266e7b0000d31

var Morse = {};

Morse.mask = 0xFFFFFFFF;
Morse.charDelimiter = '000';

/**
* This method encodes a string into morse code represented as an array of signed 32 bit integers
* Examples:
*  'HELLO WORLD' -> [-1440552402,-1547992901,-1896993141,-1461059584]
* @param {string} message - Message to encode
* @returns {Array.<number>} an array of signed 32 bit integers which encode the message
*/
Morse.encode = function(message){
  // ·–·–·– ·–·–·– ·–·–·–
  const binary = message.split('')  // Split the message into characters
    .map(c => Morse.alpha[c])       // Convert characters to Morse binary
    .join(Morse.charDelimiter)      // Add character delimiters
    .match(/(?:0|1){1,32}/g);       // Split into 32 bit chunks
  binary.push(binary.pop().padEnd(32, '0')); // Make sure the last group is 32 bits long
  
  console.log({binary});
  
  // Convert 32 bit chunks to 2s complement integers
  return binary.map(bits => parseInt(bits, 2) & Morse.mask);
  
};

/**
* This method decodes an array of signed 32 bit integers into a string
* Examples:
*  [-1440552402,-1547992901,-1896993141,-1461059584] -> 'HELLO WORLD'
* @param {Array.<number>} integerArray - Array of signed 32 bit integers to convert to decode
* @returns {string} The decoded message
*/
Morse.decode = function(integerArray){
  // ·–·–·– ·–·–·– ·–·–·–
  return binary = integerArray
     // Convert each number to 32 bit 2s complement unsigned binary string
    .map(num => ((num & Morse.mask) >>> 0).toString(2).padStart(32, '0'))
    .join('')
    .replace(/0+$/,'')  // Remove trailing 0s
    .replace(/0{7}/g, `${Morse.charDelimiter} ${Morse.charDelimiter}`)  // Handle ' ' characters
    .split(Morse.charDelimiter)  // Split on the character delimiter
    //  Get the character from bits
    .map(bits => {
      bits = bits === ' ' ? '0' : bits;
      return Object.keys(Morse.alpha).find(key => Morse.alpha[key] === bits)
    })
    .join('');
};

Morse.alpha = {
  'A': '10111',
  'B': '111010101',
  'C': '11101011101',
  'D': '1110101',
  'E': '1',
  'F': '101011101',
  'G': '111011101',
  'H': '1010101',
  'I': '101',
  'J': '1011101110111',
  'K': '111010111',
  'L': '101110101',
  'M': '1110111',
  'N': '11101',
  'O': '11101110111',
  'P': '10111011101',
  'Q': '1110111010111',
  'R': '1011101',
  'S': '10101',
  'T': '111',
  'U': '1010111',
  'V': '101010111',
  'W': '101110111',
  'X': '11101010111',
  'Y': '1110101110111',
  'Z': '11101110101',
  '0': '1110111011101110111',
  '1': '10111011101110111',
  '2': '101011101110111',
  '3': '1010101110111',
  '4': '10101010111',
  '5': '101010101',
  '6': '11101010101',
  '7': '1110111010101',
  '8': '111011101110101',
  '9': '11101110111011101',
  '.': '10111010111010111',
  ',': '1110111010101110111',
  '?': '101011101110101',
  "'": '1011101110111011101',
  '!': '1110101110101110111',
  '/': '1110101011101',
  '(': '111010111011101',
  ')': '1110101110111010111',
  '&': '10111010101',
  ':': '11101110111010101',
  ';': '11101011101011101',
  '=': '1110101010111',
  '+': '1011101011101',
  '-': '111010101010111',
  '_': '10101110111010111',
  '"': '101110101011101',
  '$': '10101011101010111',
  '@': '10111011101011101',
  ' ': '0' // Technically is 7 0-bits, but we assume that a space will always be between two other characters
};
