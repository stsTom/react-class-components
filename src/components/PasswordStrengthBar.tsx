interface PasswordStrengthBarProps {
  password: string
}

interface Rule {
  label: string
  met: boolean
}

export function PasswordStrengthBar({ password }: PasswordStrengthBarProps) {
  if (!password) return null

  const rules: Rule[] = [
    { label: '1 uppercase letter', met: /[A-Z]/.test(password) },
    { label: '1 lowercase letter', met: /[a-z]/.test(password) },
    { label: '1 number', met: /[0-9]/.test(password) },
    { label: '1 special character', met: /[^A-Za-z0-9]/.test(password) },
  ]

  const metCount = rules.filter((r) => r.met).length

  const strengthLabel =
    metCount === 0 ? 'Very weak'
    : metCount === 1 ? 'Weak'
    : metCount === 2 ? 'Fair'
    : metCount === 3 ? 'Good'
    : 'Strong'

  const strengthColor =
    metCount <= 1 ? 'var(--color-error, #c0392b)'
    : metCount === 2 ? 'var(--color-warning, #e67e22)'
    : metCount === 3 ? 'var(--color-info, #2980b9)'
    : 'var(--color-success, #27ae60)'

  return (
    <div style={{ marginBottom: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <div style={{ display: 'flex', gap: '3px', flex: 1 }}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                height: '4px',
                flex: 1,
                borderRadius: '2px',
                backgroundColor: i <= metCount ? strengthColor : 'var(--color-muted, #ddd)',
                transition: 'background-color 0.2s',
              }}
            />
          ))}
        </div>
        <small style={{ color: strengthColor, fontWeight: 600, minWidth: '5rem', textAlign: 'right' }}>
          {strengthLabel}
        </small>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem 0.75rem' }}>
        {rules.map((rule) => (
          <small
            key={rule.label}
            style={{
              color: rule.met ? 'var(--color-success, #27ae60)' : 'var(--color-muted-text, #999)',
              transition: 'color 0.2s',
            }}
          >
            {rule.met ? 'x' : 'o'} {rule.label}
          </small>
        ))}
      </div>
    </div>
  )
}