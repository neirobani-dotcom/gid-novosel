export default function AnimatedText({ text, delay = 0 }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            opacity: 0,
            animation: 'wordAppear 0.45s ease forwards',
            animationDelay: `${delay + i * 150}ms`,
          }}
        >
          {word}{i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  )
}
