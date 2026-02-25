/* ============================================
   SILVER AURA - ELEGANT JEWELRY WEBSITE STYLES
   ============================================ */

/* CSS Variables - PINK & GOLD COLORS */
:root {
    --primary-color: #E91E63;
    --primary-dark: #C2185B;
    --primary-light: #F48FB1;
    --gold-color: #B8860B;
    --gold-dark: #9A7209;
    --secondary-color: #1a1a1a;
    --text-color: #333333;
    --text-light: #666666;
    --white: #ffffff;
    --off-white: #fdf2f7;
    --gray-light: #f5f5f5;
    --border-color: #f8e1e9;
    --shadow: 0 4px 20px rgba(233, 30, 99, 0.1);
    --shadow-hover: 0 8px 30px rgba(233, 30, 99, 0.2);
    --transition: all 0.3s ease;
    --font-heading: 'Playfair Display', Georgia, serif;
    --font-body: 'Lato', Arial, sans-serif;
}

/* Reset & Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-body);
    color: var(--text-color);
    line-height: 1.6;
    background-color: var(--white);
}

a {
    text-decoration: none;
    color: inherit;
}

ul {
    list-style: none;
}

img {
    max-width: 100%;
    height: auto;
}

button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
}

/* ============================================
   TYPOGRAPHY
   ============================================ */

h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 600;
    line-height: 1.3;
}

/* ============================================
   BUTTONS
   ============================================ */

.btn {
    display: inline-block;
    padding: 14px 32px;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: 4px;
    transition: var(--transition);
    cursor: pointer;
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--gold-color) 100%);
    color: var(--white);
    border: 2px solid transparent;
}

.btn-primary:hover {
    background: linear-gradient(135deg, var(--primary-dark) 0%, var(--gold-dark) 100%);
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
}

.btn-secondary {
    background-color: transparent;
    color: var(--secondary-color);
    border: 2px solid var(--secondary-color);
}

.btn-secondary:hover {
    background-color: var(--secondary-color);
    color: var(--white);
    transform: translateY(-2px);
}

/* ============================================
   NAVIGATION
   ============================================ */

.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: var(--white);
    z-index: 1000;
    box-shadow: var(--shadow);
}

.nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 15px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    font-family: var(--font-heading);
    font-size: 28px;
    font-weight: 700;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--gold-color) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: flex;
    align-items: center;
    gap: 10px;
}

.logo i {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--gold-color) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 24px;
}

.nav-links {
    display: flex;
    gap: 40px;
}

.nav-links a {
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--text-color);
    transition: var(--transition);
    position: relative;
}

.nav-links a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--gold-color) 100%);
    transition: var(--transition);
}

.nav-links a:hover::after {
    width: 100%;
}

.nav-links a:hover {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--gold-color) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.nav-icons {
    display: flex;
    align-items: center;
    gap: 20px;
}

.cart-btn {
