const AboutUs = () => {
  return (
    <div className="space-y-16 bg-white px-4 py-12 text-gray-800 md:px-16">
      <section className="space-y-4 text-center">
        <h1 className="text-3xl font-bold text-cyan-700 md:text-5xl">🚴‍♂️ About Us</h1>
        <p className="text-xl font-medium text-gray-600 md:text-2xl">Pedal. Explore. Repeat.</p>
        <p className="mx-auto max-w-2xl text-xl text-gray-500">
          Welcome to <span className="font-semibold text-cyan-600">Cycle Sphere</span>, your
          neighborhood bicycle store where passion meets the pavement.
        </p>
      </section>

      <section className="grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-cyan-700 md:text-4xl">🌟 Who We Are</h2>
          <p className="text-gray-600">
            At Cycle Sphere, we’re more than just a bike shop — we’re a community of cyclists,
            explorers, and gear-heads who love two wheels and the freedom they bring. Since opening
            our doors in <strong>2025</strong>, we've helped thousands of riders find their perfect
            bike and get the most out of every journey.
          </p>
        </div>
        <img src="/assets/who-we-are.jpg" alt="cycle making" className="rounded-2xl shadow-md" />
      </section>

      <section className="space-y-6">
        <h2 className="text-center text-2xl font-semibold text-cyan-700 md:text-4xl">
          🛠️ What We Offer
        </h2>
        <div className="grid gap-6 text-center md:grid-cols-2 lg:grid-cols-4">
          {[
            { emoji: '🚲', title: 'Bikes for Everyone' },
            { emoji: '🧰', title: 'In-House Repair Services' },
            { emoji: '🎒', title: 'Gear & Accessories' },
            { emoji: '📍', title: 'Test Rides Available' },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl bg-cyan-50 p-6 shadow transition hover:shadow-lg">
              <div className="text-4xl">{item.emoji}</div>
              <h3 className="mt-2 text-lg font-medium text-cyan-800">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Why Customers Love Us */}
      <section className="grid items-center gap-10 md:grid-cols-2">
        <img
          src="/assets/customer-service.jpg"
          alt="Customer service"
          className="rounded-2xl shadow-md"
        />
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-cyan-700 md:text-4xl">
            ❤️ Why Our Customers Love Us
          </h2>
          <ul className="list-inside space-y-2 text-gray-600 md:text-2xl">
            <li>✔ Personalized service</li>
            <li>✔ Skilled and friendly bike techs</li>
            <li>✔ Honest advice, no pressure</li>
            <li>✔ Community-first mindset</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-4 text-center">
        <h2 className="text-2xl font-semibold text-cyan-700 md:text-4xl">🌍 Our Mission</h2>
        <p className="text-gray-600">
          To empower every person to ride more and drive less — for a healthier life, a cyaner
          planet, and a whole lot of fun along the way.
        </p>
      </section>

      <section className="space-y-4 text-center">
        <h2 className="text-2xl font-semibold text-cyan-700 md:text-4xl">👋 Visit Us Today!</h2>
        <p className="text-gray-600">
          Drop by our store in <strong>Honolulu</strong>, join one of our
          <em> Saturday morning rides</em>, or shop online anytime. We can’t wait to meet you!
        </p>
        <blockquote className="mt-6 text-gray-500 italic">
          “Riding a bike is the closest you can get to flying on land.”
          <br />— The Cycle Sphere Team
        </blockquote>
      </section>
    </div>
  );
};

export default AboutUs;
