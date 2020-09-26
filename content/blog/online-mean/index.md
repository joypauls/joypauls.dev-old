---
title: Online Mean Algorithm
description: Let's uncover an easy and intuitive algorithm to calculate averages without storing all the inputs!
date: "2020-09-02"
tags: ["Tutorial"]
---

One thing I really love is learning about multiple equivalent representations/formulations for the same mathematical concept. To me it's kind of like viewing a building from multiple perspectives and getting a much deeper sense of how it occupies the space.

## Unweighted

### Regular Mean Formula

Given a sequence of $$n$$ real numbers $$x=\{x_{1}, x_{2}, ..., x_{n}\}$$, we define the arithmetic mean as:

$$
\overline{x} = \frac{1}{n} \sum^{n}_{i=1}x_{i}
$$

### Online Mean Formula

To write this method out, we'll use a *recursive* formula. Let's define $$\overline{x}_{k}$$ as the mean of the first $$k$$ elements of the sequence $$x$$, where $$1 < k \leq n$$. Then:

$$
\begin{aligned}
\overline{x}_{1} &= x_{1} \\
\overline{x}_{k} &= \overline{x}_{k-1} + \frac{1}{k}(\overline{x}_{k-1} - x_{k})
\end{aligned}
$$

In words, this is saying:

$$
\overline{x}_{k} = (\text{current mean}) + \frac{1}{\text{\# of observations}}(\text{current mean} - \text{new observation})
$$

One way to think about this formula is that it is directly answering the question *how much will a new value influence the current average?*, and the answer is the right-hand side expression!

## Weighted

---

[^1]: citation
