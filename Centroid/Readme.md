# Centroid - How to find the center of anything

## Formula

![./images/cx.png]

![./images/cy.png]

![./images/a.png]

## Example

Let's take an example of four points:
- **0**: {x: 0, y: 0}
- **1**: {x: 0, y: 8}
- **2**: {x: 8, y: 8}
- **3**: {x: 8, y: 0}

The calculation will be as follow for the first two points 1 and 2,

L = (x0 * y1) - (y1 * y0) = (0 * 0) - (0 * 8) = 0
A = 0
Cx = (x0 + x1) * L = (0 + 0) * 0 = 0
Cy = (y0 + y1) * L = (0 + 8) * 0 = 0

For the next following point 2 and 3,

L = (x1 * y2) - (y2 * y0) = (0 * 8) - (8 * 8) = -64
A = -64
Cx = (x1 + x2) * L = (0 + 8) * -64 = -512
Cy = (y1 + y2) * L = (8 + 8) * -64 = -1024

For the next following point 3 and 4,

L = (x2 * y3) - (y3 * y2) = (8 * 0) - (8 * 8) = -64
A = -128
Cx = (x2 + x3) * L = (8 + 8) * -64 = -1024
Cy = (y2 + y3) * L = (8 + 0) * -64 = -512

Finaly, for the point 4 and 0,

L = (x3 * y0) - (y0 * y3) = (8 * 0) - (0 * 0) = 0
A = -128
Cx = (x3 + x0) * L = (8 + 0) * 0 = 0
Cy = (y3 + y0) * L = (0 + 0) * 0 = 0

When we put everything together:

A = 0.5 * -128 = -64
Cx = (1 / 6 * A) * (Sum(Cx)) = (1 / (6*-64)) * (-1024-512) = 4
Cy = 4

The centroid is at the position {x: 4, y: 4}

## Links

[https://en.wikipedia.org/wiki/Centroid](https://en.wikipedia.org/wiki/Centroid)