import * as CryptoJS from 'crypto-js';

export class EncryptUtils {
  static encryptToSha256(value: string): string {
    return CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
  }
}
