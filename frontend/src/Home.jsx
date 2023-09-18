import Product from './Product'

export default function Home() {
  return (
    <div className="container">
      <h2>Mini PERN</h2>
      <div>
        <Product />
      </div>
      <footer>
        Made with 💪 by{' '}
        <a href="https://jhordyess.com" target="_blank" rel="noreferrer">
          Jhordyess
        </a>
      </footer>
    </div>
  )
}
