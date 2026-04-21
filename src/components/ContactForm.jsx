import { useState, useRef, useCallback } from 'react';
import { brandColors } from '../data/config';

export default function ContactForm({ audioContext, masterGain }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setStatus('submitting');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [errors]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '40px',
      right: '40px',
      width: '380px',
      maxWidth: 'calc(100vw - 80px)',
      zIndex: 100,
      fontFamily: 'Inter, sans-serif'
    }}>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{
          background: 'rgba(26, 26, 46, 0.9)',
          border: `1px solid ${brandColors.primary}40`,
          borderRadius: '16px',
          padding: '24px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}
        aria-label="Contact form"
      >
        <h3 
          style={{
            fontSize: '20px',
            fontWeight: '600',
            color: brandColors.text,
            marginBottom: '20px',
            fontFamily: 'Cormorant Garamond, serif'
          }}
        >
          Weave a Message
        </h3>

        <div style={{ marginBottom: '16px' }}>
          <label
            htmlFor="name"
            style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '500',
              color: brandColors.muted,
              marginBottom: '6px'
            }}
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={status === 'submitting'}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            style={{
              width: '100%',
              padding: '12px 14px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: `1px solid ${errors.name ? '#ef4444' : `${brandColors.primary}40`}`,
              borderRadius: '8px',
              color: brandColors.text,
              fontSize: '14px',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = brandColors.primary}
            onBlur={(e) => e.currentTarget.style.borderColor = errors.name ? '#ef4444' : `${brandColors.primary}40`}
          />
          {errors.name && (
            <p id="name-error" style={{ 
              fontSize: '12px', 
              color: '#ef4444', 
              marginTop: '4px',
              margin: 0
            }}>
              {errors.name}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label
            htmlFor="email"
            style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '500',
              color: brandColors.muted,
              marginBottom: '6px'
            }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={status === 'submitting'}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            style={{
              width: '100%',
              padding: '12px 14px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: `1px solid ${errors.email ? '#ef4444' : `${brandColors.primary}40`}`,
              borderRadius: '8px',
              color: brandColors.text,
              fontSize: '14px',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = brandColors.primary}
            onBlur={(e) => e.currentTarget.style.borderColor = errors.email ? '#ef4444' : `${brandColors.primary}40`}
          />
          {errors.email && (
            <p id="email-error" style={{ 
              fontSize: '12px', 
              color: '#ef4444', 
              marginTop: '4px',
              margin: 0
            }}>
              {errors.email}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="message"
            style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '500',
              color: brandColors.muted,
              marginBottom: '6px'
            }}
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={status === 'submitting'}
            rows={4}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            style={{
              width: '100%',
              padding: '12px 14px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: `1px solid ${errors.message ? '#ef4444' : `${brandColors.primary}40`}`,
              borderRadius: '8px',
              color: brandColors.text,
              fontSize: '14px',
              resize: 'vertical',
              transition: 'all 0.2s ease',
              outline: 'none',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = brandColors.primary}
            onBlur={(e) => e.currentTarget.style.borderColor = errors.message ? '#ef4444' : `${brandColors.primary}40`}
          />
          {errors.message && (
            <p id="message-error" style={{ 
              fontSize: '12px', 
              color: '#ef4444', 
              marginTop: '4px',
              margin: 0
            }}>
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          style={{
            width: '100%',
            padding: '14px',
            background: status === 'submitting' 
              ? `${brandColors.primary}80` 
              : status === 'success'
                ? '#10b981'
                : status === 'error'
                  ? '#ef4444'
                  : brandColors.primary,
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            opacity: status === 'submitting' ? 0.7 : 1
          }}
        >
          {status === 'submitting' ? 'Weaving...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Try Again' : 'Send Message'}
        </button>

        {status === 'success' && (
          <p 
            role="status" 
            aria-live="polite"
            style={{
              textAlign: 'center',
              fontSize: '13px',
              color: '#10b981',
              marginTop: '12px',
              margin: 0
            }}
          >
            Your thread has been woven into the tapestry. I'll respond soon!
          </p>
        )}
      </form>
    </div>
  );
}
