import { useState } from 'react';

export function ErrorTrigger() {
  const [crash, setCrash] = useState(false);

  if (crash) throw new Error('Test error triggered!');
  return (
    <button className="outline secondary" onClick={() => setCrash(true)}>
      Simulate Frontend Error
    </button>
  );
}
