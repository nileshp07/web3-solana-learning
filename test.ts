function arrayToHex(byteArray) {
	let hexString = '';
	for (let i = 0; i < byteArray.length; i++) {
		hexString += byteArray[i].toString(16).padStart(2, '0');
	}
	return hexString;
}

// Example usage:
const byteArray = new Uint8Array([
	222, 5, 13, 199, 63, 193, 54, 44, 211, 192, 190, 36, 166, 219, 107, 148, 200, 121, 175, 130, 8, 235, 44, 186, 151,
	211, 63, 11, 167, 11, 214, 7, 116, 200, 253, 154, 120, 92, 37, 3, 234, 213, 170, 80, 108, 162, 195, 124, 205, 93, 17,
	227, 28, 190, 222, 183, 133, 243, 241, 135, 194, 192, 124, 54,
]); // Corresponds to "Hello"
const hexString = arrayToHex(byteArray);
console.log(hexString); // Output: "48656c6c6f"
