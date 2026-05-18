import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AuthLayout from '../components/AuthLayout.jsx';
import PasswordField from '../components/PasswordField.jsx';
import { MIN_PASSWORD_LENGTH } from '../config.js';
import { getApiError } from '../utils/errors.js';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register({ username, email, password });
      navigate('/');
    } catch (err) {
      setError(getApiError(err, 'Registration failed. Please try again.'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Join Discord Clone and start chatting"
      error={error}
      footer={
        <p className="auth-switch">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          USERNAME
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={3}
            maxLength={24}
            autoComplete="username"
            placeholder="cooluser"
          />
        </label>
        <label>
          EMAIL
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </label>
        <label>
          PASSWORD
          <PasswordField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={MIN_PASSWORD_LENGTH}
            autoComplete="new-password"
            placeholder={`min ${MIN_PASSWORD_LENGTH} characters`}
            showHint
          />
        </label>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Creating account...' : 'Continue'}
        </button>
      </form>
    </AuthLayout>
  );
}
