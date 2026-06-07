export const homePage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Home</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <h1>Home</h1>
  <p>Welcome to the Home Page</p>

  <nav>
    <a href="/">Home</a> |
    <a href="/about">About</a> |
    <a href="/contact">Contact</a>
  </nav>
</body>
</html>
`;

export const aboutPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>About</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <h1>About</h1>
  <p>Learn more about us</p>

  <nav>
    <a href="/">Home</a> |
    <a href="/about">About</a> |
    <a href="/contact">Contact</a>
  </nav>
</body>
</html>
`;

export const contactPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Contact</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <h1>Contact</h1>
  <p>Get in touch</p>

  <form action="/submit" method="POST">
    <div>
      <label for="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
      />
    </div>

    <br>

    <div>
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
      />
    </div>

    <br>

    <button type="submit">
      Submit
    </button>
  </form>

  <br>

  <nav>
    <a href="/">Home</a> |
    <a href="/about">About</a> |
    <a href="/contact">Contact</a>
  </nav>
</body>
</html>
`;

export const notFoundPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>404 Not Found</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <h1>404 Not Found</h1>
  <p>Page Not Found</p>
</body>
</html>
`;

export const serverErrorPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>500 Server Error</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <h1>500 Internal Server Error</h1>
  <p>Server Error</p>
</body>
</html>
`;