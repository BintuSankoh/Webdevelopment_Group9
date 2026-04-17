[homepage.html](https://github.com/user-attachments/files/26828994/homepage.html)

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Student Union</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header>
      <h1>Student Union</h1>
      <nav>
        <a href="#">Home</a>
        <a href="#">Events</a>
        <a href="#">Societies</a>
        <a href="#">Contact</a>
      </nav>
    </header>

    <section class="hero">
      <h2>Welcome to Your Student Hub</h2>
      <p>Discover events, join societies, and stay connected.</p>
      <button>Explore Now</button>
    </section>

    <section class="features">
      <div class="card">
        <h3>Events</h3>
        <p>Find what's happening on campus.</p>
      </div>

      <div class="card">
        <h3>Societies</h3>
        <p>Join clubs and meet new people.</p>
      </div>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #0b1f3a; /* dark blue */
  color: white;
}

/* Header */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #08162b;
}

nav a {
  margin-left: 15px;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}

/* Hero section */
.hero {
  text-align: center;
  padding: 80px 20px;
}

.hero button {
  background-color: white;
  color: #0b1f3a;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
}

.hero button:hover {
  opacity: 0.8;
}

/* Features */
.features {
  display: flex;
  justify-content: space-around;
  padding: 40px;
}

.card {
  background-color: white;
  color: #0b1f3a;
  padding: 20px;
  border-radius: 10px;
  width: 25%;
  text-align: center;
}



      [styles.css](https://github.com/user-attachments/files/26829034/styles.css)


      <div class="card">
        <h3>News</h3>
        <p>Stay updated with announcements.</p>
      </div>
    </section>
  </body>
</html>
