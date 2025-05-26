declare module '@gorules/lezer-zen' {
  import type { LRParser } from '@lezer/lr';
  export const parser: LRParser;
}

declare module '@gorules/lezer-zen-template' {
  import type { LRParser } from '@lezer/lr';
  export const parser: LRParser;
}

declare module '*?raw' {
  const content: string;
  export default content;
} 