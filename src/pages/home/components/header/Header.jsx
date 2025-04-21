import * as React from "react";
import '../../../../styles/header/Header.css';

const Logo = () => {
  return (
    <a href="/" className="logo">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/0ebabeb23a80430d9895e623e85df5a6/24833c63bef39c20e961a930363561e2dae71f8e?placeholderIfAbsent=true"
        alt="Hubly Logo"
      />
      <span>Hubly</span>
    </a>
  );
};

const Navigation = () => {
  return (
    <nav className="nav">
      <button className="nav-button ghost">Login</button>
      <button className="nav-button primary">Sign up</button>
    </nav>
  );
};

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <Navigation />
    </header>
  );
};

export default function Home() {
  return (
    <div>
      <Header />
      <main className="main container">
        <section className="hero">
          <h1>Welcome to Hubly</h1>
          <p>
            Your central hub for seamless collaboration and productivity.
            Connect, create, and accomplish more together.
          </p>
          <div className="hero-buttons">
            <button className="button primary">Get Started</button>
            <button className="button outline">Learn More</button>
          </div>
        </section>

        <section className="features">
          <div className="feature-card">
            <h3>Seamless Integration</h3>
            <p>Connect all your favorite tools and workflows in one place.</p>
          </div>
          <div className="feature-card">
            <h3>Real-time Collaboration</h3>
            <p>Work together with your team in real-time, anywhere in the world.</p>
          </div>
          <div className="feature-card">
            <h3>Advanced Analytics</h3>
            <p>Get insights into your team's performance and productivity.</p>
          </div>
        </section>

        <section className="cta">
          <h2>Ready to Get Started?</h2>
          <p>
            Join thousands of teams already using Hubly to improve their
            workflow and productivity.
          </p>
          <button className="button primary large">Start Free Trial</button>
        </section>
      </main>
    </div>
  );
}
