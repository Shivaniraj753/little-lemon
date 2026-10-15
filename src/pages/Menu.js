const MENU = [
  { course: "Starters", items: ["Greek Salad - $12.99", "Bruschetta - $7.99", "Hummus and Pita - $8.49"] },
  { course: "Mains", items: ["Grilled Sea Bass - $22.00", "Lamb Souvlaki - $19.50", "Mushroom Moussaka - $17.00"] },
  { course: "Desserts", items: ["Lemon Dessert - $6.99", "Baklava - $7.25"] },
];

export default function Menu() {
  return (
    <section className="content" aria-labelledby="menu-title">
      <h1 id="menu-title">Menu</h1>
      {MENU.map((group) => (
        <div key={group.course}>
          <h2>{group.course}</h2>
          <ul>{group.items.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
      ))}
    </section>
  );
}
