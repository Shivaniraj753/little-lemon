import { Link } from "react-router-dom";

const SPECIALS = [
  { name: "Greek Salad", price: "$12.99", text: "Crispy lettuce, peppers, olives and feta, finished with garlic-rubbed croutons." },
  { name: "Bruschetta", price: "$7.99", text: "Grilled bread smeared with garlic and seasoned with salt and olive oil." },
  { name: "Lemon Dessert", price: "$6.99", text: "Our grandmother's recipe, made fresh each morning." },
];

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">Little Lemon</h1>
        <p className="hero-sub">Chicago</p>
        <p>Mediterranean food made with family recipes and seasonal ingredients.</p>
        <Link to="/booking" className="btn">Reserve a table</Link>
      </section>
      <section className="content" aria-labelledby="specials-title">
        <h2 id="specials-title">This week's specials</h2>
        <ul className="cards">
          {SPECIALS.map((s) => (
            <li key={s.name} className="card">
              <h3>{s.name} <span className="price">{s.price}</span></h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
