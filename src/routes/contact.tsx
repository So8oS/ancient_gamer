import { createFileRoute } from '@tanstack/react-router'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

function Contact() {
  const form = useRef<HTMLFormElement>(null)

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    emailjs
      .sendForm('gmail', 'template_3nth5o9', form.current!, 'gCcVEYirrfV4fhGRt')
      .then(
        (result) => {
          console.log(result.text)
        },
        (error) => {
          console.log(error.text)
        },
      )
    e.currentTarget.reset()
    alert('The Email Has been Sent')
  }

  const fieldStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,107,157,0.2)',
    borderRadius: '4px',
    color: '#fff',
    fontFamily: '"Press Start 2P"',
    fontSize: '9px',
    padding: '14px',
    width: '100%',
    outline: 'none',
  }

  return (
    <div className="flex justify-center px-4 py-12">
      <div
        className="flex flex-col items-center gap-8 w-full"
        style={{
          maxWidth: '700px',
          background: 'rgba(255,107,157,0.05)',
          border: '1px solid rgba(255,107,157,0.15)',
          borderRadius: '10px',
          padding: '40px',
        }}
      >
        <h1 style={{ fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#fff' }}>
          CONTACT
        </h1>
        <form
          className="flex flex-col gap-6 w-full"
          ref={form}
          onSubmit={sendEmail}
        >
          <input
            style={fieldStyle}
            type="text"
            name="user_name"
            placeholder="NAME"
            required
          />
          <input
            style={fieldStyle}
            type="email"
            name="user_email"
            placeholder="EMAIL"
            required
          />
          <textarea
            style={{ ...fieldStyle, height: '180px', resize: 'none' }}
            name="message"
            placeholder="MESSAGE"
            required
          />
          <button
            type="submit"
            style={{
              background: '#ff6b9d',
              color: '#0d0020',
              fontFamily: '"Press Start 2P"',
              fontSize: '9px',
              padding: '13px 24px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              alignSelf: 'flex-start',
            }}
          >
            SEND
          </button>
        </form>
      </div>
    </div>
  )
}
