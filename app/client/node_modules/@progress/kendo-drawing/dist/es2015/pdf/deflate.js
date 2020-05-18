import { deflate as pakoDeflate } from 'pako/dist/pako_deflate';

export const deflate = pakoDeflate;

export function supportsDeflate() {
    return true;
}

