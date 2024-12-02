export interface TokenEncoder {
  encode(payload: any): Promise<string>;
  decode(token: string): Promise<any>;
}
