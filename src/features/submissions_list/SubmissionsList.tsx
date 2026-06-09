import { useFormsStore } from '../../store/useFormsStore'

export function SubmissionList() {
  const submissions = useFormsStore((s) => s.submissions)

  if (submissions.length === 0) return null

  return (
    <article>
      <header>
        <strong>Submissions</strong>
        <small style={{ marginLeft: '0.5rem', fontWeight: 'normal', opacity: 0.7 }}>
          — {submissions.length} total
        </small>
      </header>

      <figure>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Source</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Country</th>
              <th>Image</th>
              <th>Submitted at</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s, i) => (
              <tr key={s.id}>
                <td>{submissions.length - i}</td>
                <td>
                  <small>{s.source}</small>
                </td>
                <td>{s.name}</td>
                <td>{s.age}</td>
                <td>{s.email}</td>
                <td>{s.country}</td>
                <td>
                  <small>{s.imageName}</small>
                </td>
                <td>
                  <small>{s.submittedAt.toLocaleTimeString()}</small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>
    </article>
  )
}