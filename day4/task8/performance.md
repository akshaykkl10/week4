# Portfolio Performance

## Lighthouse Baseline

Initial Lighthouse Performance scores:

| Page          | Initial Score |
| ------------- | ------------: |
| Index.html    |            70 |
| About.html    |            92 |
| Blog.html     |            65 |
| Gallery.html  |            89 |
| Services.html |            75 |

## Optimisations Implemented

### 1. Improved Heading Hierarchy

Reviewed the heading structure across the pages and corrected heading hierarchy where required.

The headings now follow a more logical structure, improving document structure and accessibility.

### 2. Improved Form Component Spacing

Added appropriate gaps between input components in the form.

This improves the spacing and visual layout of form elements and makes the form easier to use.

### 3. Lazy Loading for Below-the-Fold Images

Added `loading="lazy"` to images that are not required during the initial page load.

This allows the browser to delay loading images that are outside the initial viewport, reducing unnecessary work during the initial page load.


The primary/initially visible content was not unnecessarily lazy-loaded.

### 4. Font Optimisation

Implemented the required font optimisation for the portfolio.

The primary font was configured so that text can render using a fallback font while the web font is loading, reducing the possibility of invisible text during font loading.

## Dynamic Content and Lighthouse Variability

Some pages fetch content dynamically using JavaScript. Because this content depends on the fetch request and its response timing, Lighthouse Performance scores can vary between runs.



After Lighthouse Performance scores:

| Page          | Initial Score |
| ------------- | ------------: |
| Index.html    |            98 |
| About.html    |            92 |
| Blog.html     |            92 |
| Gallery.html  |            96 |
| Services.html |            96 |
