import { marked } from 'marked';

export const tailwindRenderer = new marked.Renderer();

// const headingStyles: Record<number, string> = {
//   1: 'text-4xl font-bold tracking-tight lg:text-5xl mb-4',
//   2: 'text-3xl font-semibold tracking-tight mt-10 mb-4',
//   3: 'text-2xl font-semibold tracking-tight mt-8 mb-4',
//   4: 'text-xl font-semibold tracking-tight mt-6 mb-4',
//   5: 'text-lg font-semibold tracking-tight mt-4 mb-2',
//   6: 'text-base font-semibold tracking-tight mt-4 mb-2'
// };

// tailwindRenderer.heading = function({ tokens, depth }: { tokens: any; depth: number }) {
//   const parsedText = this.parser.parseInline(tokens || []);
//   return `<h${depth} class="scroll-m-20 ${headingStyles[depth]}">${parsedText}</h${depth}>`;
// };

// tailwindRenderer.link = function({ href, title, tokens }: { href: string | { text: string }; title?: string | null; tokens: any }) {
//   const parsedText = this.parser.parseInline(tokens || []);
//   const parsedHref = typeof href === 'object' && 'text' in href ? href.text : href;
//   return `<a href="${parsedHref}" title="${title ?? ''}" class="font-medium underline underline-offset-4 hover:text-primary">${parsedText}</a>`;
// };

// tailwindRenderer.list = function(token) {
//   const { ordered, items } = token;
//   const type = ordered ? 'ol' : 'ul';
//   const listClass = ordered ? 'list-decimal' : 'list-disc';
  
//   const listItems = items.map(item => {
//     const itemContent = this.parser.parseInline(item.tokens || []);
//     return `<li>${itemContent}</li>`;
//   }).join('\n');

//   return `<${type} class="my-6 ml-6 ${listClass} [&>li]:mt-2">${listItems}</${type}>`;
// };

marked.setOptions({
  renderer: tailwindRenderer,
  gfm: true,
  breaks: true,
});

export function parseMarkdown(content: string) {
  return marked.parse(content);
}
