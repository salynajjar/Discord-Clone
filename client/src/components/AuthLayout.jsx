export default function AuthLayout({ title, subtitle, footer, error, children }) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="brand-icon">&#128172;</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        {error ? <div className="form-error">{error}</div> : null}
        {children}
        {footer}
      </div>
    </div>
  );
}
