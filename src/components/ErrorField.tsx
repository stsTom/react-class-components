export function ErrorField({ message }: { message?: string }) {
  return <small aria-live="polite">{message ?? ''}</small>;
}
