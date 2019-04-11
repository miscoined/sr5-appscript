/**
 * Returns the total accumulated cost for the desired rating.
 * @param {number} cost - the cost per rating.
 * @param {number} end - the desired rating.
 * @param {number} start - the current rating, default 0.
 * @return The accumulated cost for the desired rating from the current rating.
 * @customfunction
 */
function COST(cost, end, start) {
  if (start == undefined) start = 0;
  return cost / 2 * (end * (1 + end) - start * (1 + start));
}

/**
 * Returns the total accumulated cost for an attribute at the desired rating.
 * @param {number} end - the desired rating.
 * @param {number} start - the current rating, default 0.
 * @return The accumulated cost for the desired rating from the current rating.
 * @customfunction
 */
function ATTRCOST(end, start) { return COST(5, end, start); }

/**
 * Returns the total accumulated cost for a skill at the desired rating.
 * @constructor
 * @param {number} end - the desired rating.
 * @param {number} start - the current rating, default 0.
 * @return The accumulated cost for the desired rating from the current rating.
 * @customfunction
 */
function SKILLCOST(end, start) { return COST(2, end, start); }

/**
 * Returns the total accumulated cost for the given skills.
 *
 * Assume that all non-grouped skills occur before grouped skills, and skill groups are denoted by
 * ending in 'SG'.
 *
 * @param {range} skills - a range for skills. Expects names in first column and ratings in second.
 * @param {number} skillcost - the cost for skills, default 2.
 * @param {number} groupcost - the cost for skill groups, default 5.
 * @param {number} speccost - the cost for specializations, default 7.
 * @return The accumulated cost.
 * @customfunction
 */
function SKILLCOSTS(skills, skillcost, groupcost, speccost) {
  if (skillcost == undefined) skillcost = 2;
  if (groupcost == undefined) groupcost = 5;
  if (speccost == undefined) speccost = 7;

  var inGroups = false;
  return ratings.reduce(function(total, skill) {
    if (/^.*SG$/.test(skill[0])) {
      inGroups = true;
      return total + COST(groupcost, skill[1]);
    }
    if (!inGroups) {
      if (/^.*\(.*\)$/.test(skill[0])) total += speccost;
      return total + COST(skillcost, skill[1]);
    }
    return total;
  }, 0);
}

/**
 * Return the value associated with the first item in the range with that name.
 *
 * @param {string} name - the name to search for.
 * @param {range} values - the range of values. Expect name in first column and value in second.
 * @return The associated value, or FALSE if not found.
 * @customfunction
 */
function GET(name, values) {
  var val = false;
  values.some(function(i) {
    if (!i[0].indexOf(name) > -1) return false;
    val = i[1];
    return true;
  });
  return augVal;
}
