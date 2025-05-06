import { describe, it, expect } from 'vitest';
import '@views/buttonView';

describe('button-component', () => {
  it('renders text', async () => {
    const btn = document.createElement('button-component');
    document.body.appendChild(btn);

    await Promise.resolve();

    const rendered = document.querySelector('button-component');
    expect(rendered).not.toBeNull();
    expect(rendered.textContent).toBe('Test Button');
  });
});