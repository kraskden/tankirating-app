

/**
 * @summary Create parser for conditional-pattern.
 * 
 * 
 * @description Pattern syntax: 
 * 
 * [GROUP, [BREAKPOINT], GROUP, [BREAKPOINT], GROUP]
 * 
 * 
 * @restrictions GROUP is not an array, BREAKPOINT is number
 * 
 * Example:
 * 
 *  
 * Pattern: ["First group", [4], "Second group", [10], "Third group"]
 * 
 * 
 * For all x, where x < 4 -> match(x) == "First group"
 * 
 * 
 * For all x, where 4 <= x < 10 -> match(x) == "Second group"
 * 
 * 
 * For all x, where x >= 10 -> match(x) == "Third group"
 * 
 * @param {Array} pattern 
 * @returns Match function
 */
export function matcher(pattern) {

  return function match(value) {
    let group = null;
    for (const i of pattern) {
      if (Array.isArray(i)) {
        const breakpoint = i[0]
        if (value < breakpoint) {
          return group;
        }
      } else {
        group = i
      }
    }
    return group
  }

}