import { createDecipheriv } from 'node:crypto';

// for AES encryption, with 16 digits key(size: 128 bit), cbc mode(iv: initialization vector required)
// encrypted here: https://www.javainuse.com/aesgenerator, 16 digits string generator here: https://codebeautify.org/generate-random-string
export const decryptAes128Cbc = (
	encrypted: string, // Base64 encoded
	key: string,
	iv: string
): string => {
	const decipher = createDecipheriv('aes-128-cbc', key, iv);
	let decipheredData = decipher.update(encrypted, 'base64', 'utf8');
	decipheredData += decipher.final('utf8');

	return decipheredData;
};
