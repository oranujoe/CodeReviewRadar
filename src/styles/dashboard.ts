export const neobrutalistStyles = `
  :root {
    --vc-bg: #111827;
    --vc-surface: #1f2937;
    --vc-elevated: #374151;
    --vc-border: #000000;
    --vc-accent: #3b82f6;
    --vc-primary: #2563eb;
    --vc-text-primary: #f9fafb;
    --vc-text-secondary: #d1d5db;
    --vc-text-placeholder: #6b7280;
    --vc-row-stripe: rgba(55, 65, 81, 0.3);
  }
  
  .bg-\\[--vc-bg\\] { background-color: var(--vc-bg); }
  .bg-\\[--vc-surface\\] { background-color: var(--vc-surface); }
  .bg-\\[--vc-elevated\\] { background-color: var(--vc-elevated); }
  .text-\\[--vc-text-primary\\] { color: var(--vc-text-primary); }
  .text-\\[--vc-text-secondary\\] { color: var(--vc-text-secondary); }
  .placeholder-\\[--vc-text-placeholder\\]::placeholder { color: var(--vc-text-placeholder); }
  .border-\\[--vc-border\\] { border-color: var(--vc-border); }
  .focus\\:outline-\\[--vc-accent\\]:focus { outline-color: var(--vc-accent); }
  .hover\\:shadow-\\[0_0_0_1px_var\\(--vc-accent\\)\\]:hover { box-shadow: 0 0 0 1px var(--vc-accent); }
  .bg-\\[--vc-primary\\] { background-color: var(--vc-primary); }
  .hover\\:bg-\\[--vc-accent\\]:hover { background-color: var(--vc-accent); }
  .even\\:bg-\\[--vc-row-stripe\\]:nth-child(even) { background-color: var(--vc-row-stripe); }
  
  .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: var(--vc-surface); border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background-color: var(--vc-elevated); border-radius: 10px; border: 2px solid var(--vc-surface); }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: var(--vc-accent); }
`;