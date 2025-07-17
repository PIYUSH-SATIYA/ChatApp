## Key prop vs Index

There are two ways to handle the array of elements in react: 1. indices as keys 2. non-index thing as keys.

Index literally means the index of the array, which are always contiguos, which is a major drawback.  
say an elem is deleted from midway, some other elem comes at the same index, which may be confused with deleted elem in many cases like animations, inputs etc.  
One more thing is that using index is not optimized.

So the main idea is to avoid using index in case of dynamic lists or where there is some logical interactions like input, animations etc.

There comes the use of the prop key, which allows us to use something else as the accessing elem, generally the id of the elem usually put by the db itself in the most cases or usually put by most devs.

Use index as key ONLY IF:

-   The list is static — items will never be added, removed, or reordered
-   It's purely presentational — no input fields, no animations, no component state
-   It's a temporary hack or quick test
-   The data is hardcoded or predictable (e.g., days of the week, menu icons)

### DO NOT use index as key IF:

-   The list can change over time (add/remove/sort)
-   The components hold internal state (e.g., form inputs, toggles)
-   You use animations or transitions
-   The same array item might appear in a different position later
-   You receive dynamic data from an API or database
-   You want to avoid hard-to-debug UI bugs
